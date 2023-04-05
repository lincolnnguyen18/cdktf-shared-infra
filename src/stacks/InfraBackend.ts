import environment from '@src/common/environment';
import GitHubActionsRole from '@src/components/GitHubActionsRole';
import { Server } from '@gen/providers/hcloud/server';
import { Construct } from 'constructs';

const userData = `#cloud-config
packages:
  - docker.io
  - docker-compose
  - awscli
package_update: true
package_upgrade: true
runcmd:
  - echo "export AWS_ACCESS_KEY_ID=${environment.USER_DATA_AWS_ACCESS_KEY_ID}" >> /root/.profile
  - echo "export AWS_SECRET_ACCESS_KEY=${environment.USER_DATA_AWS_SECRET_ACCESS_KEY}" >> /root/.profile
  - echo "export AWS_DEFAULT_REGION=${environment.USER_DATA_AWS_DEFAULT_REGION}" >> /root/.profile
  - echo "export AWS_DEFAULT_OUTPUT=${environment.USER_DATA_AWS_DEFAULT_OUTPUT}" >> /root/.profile
  - . /root/.profile && aws s3 sync ${environment.SERVER_FILES_S3_URL} /root/server-files
  - cd /root/server-files && chmod +x ./deploy.sh && ./deploy.sh
`;

export default class SharedInfraBackend extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id);

    new GitHubActionsRole(this, 'github_actions_role', {
      organization: environment.GITHUB_USERNAME,
      thumbprint: environment.GITHUB_OIDC_THUMBPRINT,
    });
    
    new Server(this, 'server', {
      name: 'server-jo1',
      image: 'ubuntu-22.04',
      serverType: 'cx11',
      sshKeys: ['default-rsa'],
      firewallIds: [818236],
      userData,
    });
  }
}
