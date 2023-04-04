import environment from '@src/common/environment';
import GitHubActionsRole from '@src/components/GitHubActionsRole';
import { Construct } from 'constructs';

export default class SharedInfraBackend extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id);

    new GitHubActionsRole(this, 'github_actions_role', {
      organization: environment.GITHUB_USERNAME,
      thumbprint: environment.GITHUB_OIDC_THUMBPRINT,
    });

    // new Server(this, 'server', {
    //   name: 'server-jo1',
    //   image: 'ubuntu-22.04',
    //   serverType: 'cx11',
    //   sshKeys: ['default-rsa'],
    // });
  }
}
