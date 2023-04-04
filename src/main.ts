import SharedInfraBackend from '@src/stacks/InfraBackend';
import environment from '@src/common/environment';
import { Construct } from 'constructs';
import { App, S3Backend, TerraformStack } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { HcloudProvider } from '@gen/providers/hcloud/provider';

export class Infra extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id);

    // Providers
    new S3Backend(this, {
      bucket: environment.S3_BACKEND_BUCKET_NAME,
      key: environment.S3_BACKEND_BUCKET_KEY,
      region: environment.S3_BACKEND_AWS_REGION,
    });

    new AwsProvider(this, 'aws_provider', {
      region: environment.AWS_REGION,
    });

    new HcloudProvider(this, 'hcloud_provider', {
      token: environment.HETZNER_TOKEN,
    });

    new SharedInfraBackend(this, 'infra_backend');
  }
}

export class InfraStack extends TerraformStack {
  constructor (scope: Construct, id: string) {
    super(scope, id);

    new Infra(this, 'infra');
  }
}

const app = new App();
new InfraStack(app, 'infra_stack');
app.synth();
