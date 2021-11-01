package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/ec2"
	"github.com/aws/aws-sdk-go/aws"

	"encoding/json"
)

type Status struct {
    Message string `json:"message"`
	Machine string `json:"machine"`
	State string `json:"state"`
	Name string `json:"name"`
}

func getInstanceStatus(targetInstance string, ec2Svc *ec2.EC2) (Status, error) {
	input := &ec2.DescribeInstancesInput{
		InstanceIds: []*string{
			aws.String(targetInstance),
		},
	}
	// Call to get detailed information on each instance
	result, err := ec2Svc.DescribeInstances(input)
	if err != nil {
		var status Status
		return status, err
	}

	var name string
	machine := *result.Reservations[0].Instances[0].InstanceType
	state := *result.Reservations[0].Instances[0].State.Name
	for _, tag := range result.Reservations[0].Instances[0].Tags {
		if *(tag).Key == "Name" {
			name = *(tag).Value
		}
	}

	status := Status{"Status retrieved", machine, state, name}

	return status, err
}

func handleStatus(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// TODO pass it as query
	targetInstance := "i-05047b74eba721a3b"

	// Load session from shared config
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create new EC2 client
	ec2Svc := ec2.New(sess)

	result, err := getInstanceStatus(targetInstance, ec2Svc)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Couldn't access the EC2 instance",
			StatusCode: 500,
		}, nil
	}

	body, err := json.Marshal(result)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Error while decoding describe results",
			StatusCode: 500,
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(body),
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
	lambda.Start(handleStatus)
}