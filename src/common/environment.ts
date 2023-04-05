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
  AWS_DEFAULT_REGION: string;
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

  // AWS credentials
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_DEFAULT_OUTPUT: string;
  
  /**
   * The URL of the S3 bucket where the server-files folder is stored.
   */
  SERVER_FILES_S3_URL: string;
}

const environment: Environment = {
  S3_BACKEND_BUCKET_NAME: process.env.S3_BACKEND_BUCKET_NAME as string,
  S3_BACKEND_BUCKET_KEY: process.env.S3_BACKEND_BUCKET_KEY as string,
  S3_BACKEND_AWS_REGION: process.env.S3_BACKEND_AWS_REGION as string,
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION as string,
  HETZNER_TOKEN: process.env.HETZNER_TOKEN as string,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME as string,
  GITHUB_OIDC_THUMBPRINT: process.env.GITHUB_OIDC_THUMBPRINT as string,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  AWS_DEFAULT_OUTPUT: process.env.AWS_DEFAULT_OUTPUT as string,
  SERVER_FILES_S3_URL: process.env.SERVER_FILES_S3_URL as string,
};

export default environment;
