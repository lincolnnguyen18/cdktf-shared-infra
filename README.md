# How project was setup
The files used to setup this project were copied from the [template-files](https://github.com/lincolnnguyen18/template-files) repository.

Run the following commands:
```bash
# Initialize cdktf project
cdktf init --template=typescript --local \
--project-name=infra \
--project-description="Shared infrastructure for lincolnnguyen.me" \
--from-terraform-project=false \
--enable-crash-reporting=true \
--providers=\
hashicorp/aws \
hetznercloud/hcloud

# Install other dependencies
npm i \
dotenv \
tsconfig-paths \
eslint \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser
```

Delete the following files/folders:
* main.ts
* tsconfig.json
* jest.config.js
* .gitignore
* \_\_tests\_\_

Copy the following files/folders to the root directory:
* Create yourself and store in an S3 bucket (look at `src/common/environment.ts` for details)
  * .env
* Copy from `general/eslint-non-react`
  * .eslintrc
  * .eslintignore
* Copy from `project-specific/cdktf-shared-infra`
  * .gitignore
  * jest.config.js
  * tsconfig.json
  * src
  * .github

In `cdktf.json`, change
```json
"app": "npx ts-node main.ts"
```
to
```json
"app": "npx ts-node src/main.ts"
```

In `package.json`, add the following script:
```json
"lint": "eslint ."
```

Then,
* Run Jest: Setup Extension in VSCode
* Initialize the git repository
* Create SSH key named default-rsa in Hetzner Cloud
* Create S3 bucket for storing .env file and Terraform state
* Make sure all .env variables are set according to src/common/environment.ts
* Upload .env file to S3 bucket
* Publish to GitHub without GitHub Actions
* Get GITHUB_OIDC_THUMBPRINT from AWS console as documented in src/common/environment.ts
* Deploy terraform stack to create GitHub Actions IAM role
* Set GITHUB_IAM_ROLE_ARN, ENV_FILE_S3_URL, and AWS_REGION in the env block of .github/workflows/deploy.yml
* Update repository to use GitHub Actions

# Commands
Listed in no particular order.
```bash
# Running cdktf commands for dev environment
cdktf diff
# Running cdktf commands for a specific environment
TARGET_ENV=staging cdktf diff

# Install Docker
sudo apt-get update -y
sudo apt-get install docker.io -y

# Start cassandra
docker run -d \
  -e CASSANDRA_LISTEN_ADDRESS=127.0.0.1 \
  -p 9042:9042 \
  --name cassandra \
  cassandra
# connect to cassandra
docker run -it --rm cassandra:latest cqlsh 65.109.172.137 9042
# view logs
docker logs cassandra
```