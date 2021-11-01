package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/ec2"
)

func handleStart(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// TODO pass it as query
	targetInstance := "i-05047b74eba721a3b"

	// Load session from shared config
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))
		// Create new EC2 client
	ec2Svc := ec2.New(sess)

    input := &ec2.StartInstancesInput{
            InstanceIds: []*string{
                aws.String(targetInstance),
            },
            DryRun: aws.Bool(false),
        }
    _, err := ec2Svc.StartInstances(input)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Error while starting the instance",
			StatusCode: 500,
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "{\"message\":\"Starting instances\"}",
		// This is important as part of the CORS config.
		// Again you should know the security implications of CORS before implementing this
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
		},
	}, nil
}

func main() {
	lambda.Start(handleStart)
}
