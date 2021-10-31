# Set defaults if the Env vars aren't set

ifeq ($(USER_EMAIL),)
	USER_EMAIL := 'test@example.com'
endif

ifeq ($(USER_PWD),)
	USER_PWD := 'DefaultPassword'
endif

ifeq ($(STACK_NAME),)
	STACK_NAME := 'cognito-lambda-test-stack'
endif

ifeq ($(STACK_BUCKET),)
	STACK_BUCKET := 'cognito-test-stack-plumbing-bucket'
endif

ifeq ($(POOL_NAME),)
	POOL_NAME := "TestingUsers"
endif

POOL_ID := $(shell aws cognito-idp list-user-pools --max-results 20 | jq '.UserPools[] | select(.Name == $(POOL_NAME)) | {Id} | .Id'  | sed -e 's/^"//' -e 's/"$$//')

.PHONY: env
env:
	@echo USER_EMAIL = $(USER_EMAIL) 
	@echo USER_PWD = $(USER_PWD) 
	@echo STACK_NAME = $(STACK_NAME) 
	@echo STACK_BUCKET = $(STACK_BUCKET) 
	@echo POOL_NAME = $(POOL_NAME)

.PHONY: test
test:
	aws cloudformation validate-template --template-body file://template.yaml

.PHONY: clean
clean:
	rm -rf ./dist
	rm -rf template_deploy.yaml

.PHONY: deps
deps: clean
	go get github.com/aws/aws-lambda-go/events
	go get github.com/aws/aws-lambda-go/lambda

.PHONY: build
build: deps
	go env -w GO111MODULE=off # Needed to fix "github.com/aws/aws-lambda-go/events: go.mod file not found" issue.
	GOOS=linux go build -o dist/authenticated ./src/authenticated.go
	GOOS=linux go build -o dist/open ./src/open.go

.PHONY: api
api: build
	sam local start-api

.PHONY: deploy_infra
deploy_infra: build
	aws cloudformation package \
		--template-file template.yaml \
		--output-template template_deploy.yaml \
		--s3-bucket $(STACK_BUCKET)

	# aws s3 cp ./swagger.yaml s3://$(STACK_BUCKET)/lambda-cognito-go-api-def.yaml
	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file template_deploy.yaml \
		--stack-name $(STACK_NAME) \
		--parameter-overrides "ResourceBucket=$(STACK_BUCKET)" "YourEmail=$(USER_EMAIL)" \
        --capabilities CAPABILITY_IAM

# Note: To create other users, you can override USER_MAIL and USER_PWD with : USER_MAIL="" USER_PWD="" make create_user
.PHONY: create_user
create_user:
	@echo create user $(USER_EMAIL) pwd $(USER_PWD)
	@aws cognito-idp admin-create-user \
		--user-pool-id $(POOL_ID) \
		--username $(USER_EMAIL)
	@aws cognito-idp admin-set-user-password \
		--user-pool-id $(POOL_ID) \
		--username $(USER_EMAIL) \
		--password $(USER_PWD) \
		--permanent

.PHONY: deploy
deploy: deploy_infra create_user

.PHONY: teardown
teardown:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
