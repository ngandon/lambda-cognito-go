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
    const getStatus = () => {
        if(!initialCheck){
            setInitialCheck(true)
        }
        (async () => {
            try {
                // const response = await API.get("lambda-API", "/Stage/open");
                const response = await API.get("lambda-API", "/Stage",  {
                                                                    headers: {
                                                                        "Authorization": idToken
                                                                    },
                                                                    })
                console.log(response.data)
                setStatus({"name": "one", "state":"two", "machine":"tree" })
            } catch (e) {
              console.error(e);
            }
        })();
      };
    
      const startServer = () => {
        (async () => {
            try {
              console.log("start")
              console.log(idToken)
            } catch (e) {
              console.error(e);
            }
          })();
      };
    
      const stopServer = () => {
    
        (async () => {
            try {
              console.log("stop")
            } catch (e) {
              console.error(e);
            }
          })();
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