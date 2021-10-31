import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";
import SignInForm from "./pages/SignInForm";
import Welcome from "./pages/Welcome";
import { AppContext } from "./lib/contextLib";
import "./App.css";

function App() {   

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    const PrivateRoute = ({ children, ...rest }) => {
        return (
          <Route {...rest}>
            {isAuthenticated ? children : <Redirect to="sign-in" />}
          </Route>
        );
      };

    return (
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
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
    );
}

export default App;