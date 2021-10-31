import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SignInForm from "./pages/SignInForm";
import { AppContext } from "./lib/contextLib";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <Switch>
        <div className="App">
            <div className="appAside" />
            <div className="appForm">
                <div className="formTitle">               
                    <Route path="/">
                    <SignInForm />
                    </Route>
                </div>
            </div>
        </div>
      </Switch>
      </Router>
    );
  }
}

export default App;