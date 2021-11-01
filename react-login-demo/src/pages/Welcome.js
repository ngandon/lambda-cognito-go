import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";

const Welcome = () => {

    const [status, setStatus] = useState([]);
    const [initialCheck, setInitialCheck] = useState(false);
    const { userHasAuthenticated } = useAppContext();
    const { idToken } = useAppContext();

    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);
    }      

    // TODO : refresh token if needed
    // eslint-disable-next-line
    async function getStatus () {
        if(!initialCheck){
            setInitialCheck(true)
        }       
        try {
            // const response = await API.get("lambda-API", "/Stage/open");
            const response = await API.get("lambda-API", "/Stage/status",  {
                                                                headers: {
                                                                    "Authorization": idToken
                                                                },})
            console.log("status")
            console.log(response.message)
            setStatus({"name": "one", "state":"two", "machine":"tree" })
        } catch (e) {
            console.error(e);
        }
      };
    
      async function startServer () {
        try {
            const response = await API.post("lambda-API", "/Stage/start",  {
                                                                headers: {
                                                                    "Authorization": idToken
                                                                },})
            console.log("start")
            console.log(response.message)
        } catch (e) {
            console.error(e);
        }
      };
    
      async function stopServer () {
        try {
            const response = await API.post("lambda-API", "/Stage/stop",  {
                                                                headers: {
                                                                    "Authorization": idToken
                                                                },})
            console.log("stop")
            console.log(response.message)
        } catch (e) {
            console.error(e);
        }
      };

      useEffect(() => {
        if(!initialCheck){
            getStatus()
        }
      }, [initialCheck, getStatus]);

    return (
        <div className="appForm">
            <div><p>the status of the server <b>{status.name}</b> is {status.state} on a {status.machine} machine</p></div>
            <div>
                <button onClick={getStatus}>Check server status</button>
                <button onClick={startServer}>Start the server</button>
                <button onClick={stopServer}>Stop the server</button>
            </div>
            <div><button onClick={handleLogout}>Log Out</button></div>
        </div>
    );
}

export default Welcome;