import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import config from './config';
import Amplify from "aws-amplify"

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
      },
      API: {
        endpoints: [
          {
            name: "lambda-API",
            endpoint: config.apiGateway.URL,
            region: config.apiGateway.REGION
          },
        ]
      }
    });

ReactDOM.render(<App />, document.getElementById("root"));
