import 'cdktf/lib/testing/adapters/jest';
import environment from '@src/common/environment';
import { Testing } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { IamOpenidConnectProvider } from '@cdktf/provider-aws/lib/iam-openid-connect-provider';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { Infra, InfraStack } from '@src/main';
import { HcloudProvider } from '@gen/providers/hcloud/provider';
import { Server } from '@gen/providers/hcloud/server';

const testName = 'test';
const stack = Testing.fullSynth(
  new InfraStack(Testing.app(), testName),
);
const infra = Testing.synthScope((scope) => {
  new Infra(scope, testName);
});

describe('Shared infrastructure', () => {
  describe('Checking validity', () => {
    it('check if the produced terraform configuration is valid', () => {
      expect(stack).toBeValidTerraform();
    });

    it('check if this can be planned', () => {
      expect(stack).toPlanSuccessfully();
    });

    it('has valid environment variables', () => {
      // all fields are not undefined or null
      expect(environment.S3_BACKEND_BUCKET_NAME != null).toBeTruthy();
      expect(environment.S3_BACKEND_BUCKET_KEY != null).toBeTruthy();
      expect(environment.S3_BACKEND_AWS_REGION != null).toBeTruthy();
      expect(environment.AWS_DEFAULT_REGION != null).toBeTruthy();
      expect(environment.HETZNER_TOKEN != null).toBeTruthy();
      expect(environment.GITHUB_USERNAME != null).toBeTruthy();
      expect(environment.GITHUB_OIDC_THUMBPRINT != null).toBeTruthy();

      expect(environment.USER_DATA_AWS_ACCESS_KEY_ID != null).toBeTruthy();
      expect(environment.USER_DATA_AWS_SECRET_ACCESS_KEY != null).toBeTruthy();
      expect(environment.USER_DATA_AWS_DEFAULT_OUTPUT != null).toBeTruthy();
      expect(environment.USER_DATA_AWS_DEFAULT_REGION != null).toBeTruthy();
      expect(environment.SERVER_FILES_S3_URL != null).toBeTruthy();
    });
  });

  describe('Unit testing using assertions', () => {
    it('should contain providers', () => {
      const providers = [AwsProvider, HcloudProvider];
      for (const provider of providers) {
        expect(infra).toHaveProvider(provider);
      }
    });

    it('should contain GitHubActions role', () => {
      expect(infra).toHaveResourceWithProperties(IamOpenidConnectProvider, {
        url: 'https://token.actions.githubusercontent.com',
      });
      expect(infra).toHaveResourceWithProperties(IamRole, {
        name: 'github_actions_role',
      });
    });

    it('should contain server', () => {
      expect(infra).toHaveResourceWithProperties(Server, {
        name: 'server-jo1',
        image: 'ubuntu-22.04',
        server_type: 'cx11',
        ssh_keys: ['default-rsa'],
        firewall_ids: [818236],
      });
    });
  });
});
