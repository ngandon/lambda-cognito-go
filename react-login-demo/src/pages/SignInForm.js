import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import { useHistory } from "react-router";

const SignInForm = () => {

    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleChangeUsename = event => {
        setEmail(event.target.value);
      };

    const handleChangePassword = event => {
        setPassword(event.target.value);  
    };

    const handleSubmit = () => {
        (async () => {
            try {
                await Auth.signIn(email, password);
                userHasAuthenticated(true);
                alert("Logged in");
                
            } catch (e) {
                alert(e.message);
            }
        })();
        history.push("/welcome");
    };

    useEffect(() => {
        // Redirect to the logged in pages if the user is logged in
        if (isAuthenticated) {
            history.push("/welcome");
        }
    }, [isAuthenticated, history]);

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

export default SignInForm;