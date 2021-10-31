import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify"

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: 'us-west-3',
        userPoolId: 'eu-west-3_VL7aT2B6L',
        userPoolWebClientId: '678utp8o005ghaet957rfena50'
    }
})

ReactDOM.render(<App />, document.getElementById("root"));
