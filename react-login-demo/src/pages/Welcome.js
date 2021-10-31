import React, { useState, useEffect } from "react";
import { useAppContext } from "../lib/contextLib";

const Welcome = () => {

    const [status, setStatus] = useState([]);
    const [initialCheck, setInitialCheck] = useState(false);
    const { userHasAuthenticated } = useAppContext();

    function handleLogout() {
        userHasAuthenticated(false);
    }      

    const getStatus = () => {
        (async () => {
            try {
                console.log("salut")
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
            } catch (e) {
              console.error(e);
            }
          })();
        console.log("bonjour");
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
      }, []);

    return (
        <div className="appForm">
            <div><p>the status of the server <b>{status.name}</b> is {status.state} on a {status.machine} machine</p></div>
            <div>
                <button onClick={getStatus}>Check server status</button>
                <button onClick={startServer}>Start the server</button>
                <button onClick={stopServer}>Stop the server</button>
            </div>
            <div><button onClick={handleLogout}>Sign Out</button></div>
        </div>
    );
}

export default Welcome;