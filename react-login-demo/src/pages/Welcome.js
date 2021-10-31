import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";


const Welcome = () => {

    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsename = event => {
        setEmail(event.target.value);  
      };

    const handleChangePassword = event => {
        setPassword(event.target.value);  
    };

    const handleSubmit = () => {
        (async () => {
            console.log("The form was submitted with the following data:");

            try {
                await Auth.signIn(email, password);
                alert("Logged in");
                userHasAuthenticated(true);
                console.log(isAuthenticated)
            } catch (e) {
                alert(e.message);
            }
        })();
        console.log("bonjour");
    };

    return (
    <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}>
        <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
            </label>
            <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChangeUsename}
            />
        </div>

        <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
            Password
            </label>
            <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            />
        </div>

        <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
        </div>

        </form>
    </div>
    );
}

export default Welcome;