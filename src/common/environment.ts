import * as dotenv from 'dotenv';

dotenv.config();

interface Environment {
  /**
   * The name of the S3 bucket where the Terraform state will be stored.
   */
  S3_BACKEND_BUCKET_NAME: string;
  /**
   * The path to the Terraform state file inside the S3 bucket.
   */
  S3_BACKEND_BUCKET_KEY: string;
  /**
   * The AWS region used by the S3 backend.
   */
  S3_BACKEND_AWS_REGION: string;
  /**
   * The AWS region used by the AWS provider.
   */
  AWS_REGION: string;
  /**
   * The Hetzner Cloud API token.
   */
  HETZNER_TOKEN: string;
  /**
   * Your GitHub username or organization name.
   */
  GITHUB_USERNAME: string;
  /**
   * The GitHub OIDC thumbprint used by the GitHub Actions role. You can get this from the AWS console at IAM > Identity providers > GitHub > Create Identity provider. Use "https://token.actions.githubusercontent.com" as the Provider URL and click "Get thumbprint".
   */
  GITHUB_OIDC_THUMBPRINT: string;
}

const environment: Environment = {
  S3_BACKEND_BUCKET_NAME: process.env.S3_BACKEND_BUCKET_NAME as string,
  S3_BACKEND_BUCKET_KEY: process.env.S3_BACKEND_BUCKET_KEY as string,
  S3_BACKEND_AWS_REGION: process.env.S3_BACKEND_AWS_REGION as string,
  AWS_REGION: process.env.AWS_REGION as string,
  HETZNER_TOKEN: process.env.HETZNER_TOKEN as string,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME as string,
  GITHUB_OIDC_THUMBPRINT: process.env.GITHUB_OIDC_THUMBPRINT as string,
};

export default environment;
