# Supporting codebase for blog tutorial
Visit [Here](https://tenmilesquare.com/aws-sam-api-with-cognito/) to view the associated blog content.

## Cloud Provisionning

In the folder cloud_infra is the tools to provision a cloud_formation stack

### To deploy
- Set the following environment variables
  - USER_MAIL : mail used to create the first user
  - USER_PWD : password used to create the first user
  - STACK_NAME : name of the stack that will be created
  - STACK_BUCKET : name of an existing s3 bucket
  - POOL_NAME : name of the Cognito UserPool that will be created
      --> Warning : POOL_NAME must be between double quote, and be of the shape "poolName"
- run `make deploy` or `make update`

### To get an idToken
- run `./scripts/login {{User Pool Client ID}} {{Your Email}} {{Your Password}}`

The idToken field is the one to use for API authorization

### To call the API with curl

For an open API :
- run `curl {{Url to your api}}/open`

For a restricted API :
- run `curl -H "Authorization: {{Auth Token from script above}}" {{Url to your api}}`

PRs and suggestions are welcome.