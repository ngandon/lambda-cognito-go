import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";
import SignInForm from "./pages/SignInForm";
import Welcome from "./pages/Welcome";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import "./App.css";

function App() {   

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [idToken, setIdToken] = useState();

    useEffect(() => {
        onLoad();
      }, []);
    
    // load the user session
    async function onLoad() {
        try {
            const res = await Auth.currentSession();
            const token = res.getIdToken().getJwtToken();
            console.log(token)
            setIdToken(token)
            console.log("already logged in")
            userHasAuthenticated(true);            
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
            console.log("not logged in")
        }  
        setIsAuthenticating(false);
        
    }
      

    const PrivateRoute = ({ children, ...rest }) => {
        return (
          <Route {...rest}>
            {isAuthenticated ? children : <Redirect to="sign-in" />}
          </Route>
        );
      };

    return (
        !isAuthenticating && (
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, idToken }}>
                <Router basename="/react-auth-ui/">
                    <div className="App">
                        <div className="appAside" />
                        <div className="appForm">
                            <Switch>
                                <Route path="/sign-in">
                                <div className="formTitle"> 
                                    <div className="formTitle"> Please sign in</div>            
                                    <SignInForm />
                                </div>
                                </Route>
                                <PrivateRoute path="/welcome">
                                <div className="formTitle"> 
                                    <div className="formTitle"> Welcome you</div>
                                    <Welcome />
                                </div>
                                </PrivateRoute>
                                <Redirect to="/sign-in" />
                            </Switch>
                        </div>
                    </div>
                    
                </Router>
            </AppContext.Provider>
        )
    );
}

export default App;