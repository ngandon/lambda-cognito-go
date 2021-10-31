import React, { Component, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SignInForm from "./pages/SignInForm";
import { AppContext } from "./lib/contextLib";
import "./App.css";

function App() {   

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
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
        </AppContext.Provider>
    );
}

export default App;

// class App extends Component {
    
//     render() {
//         return (
//             <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
//                 <Router basename="/react-auth-ui/">
//                     <Switch>
//                     <div className="App">
//                         <div className="appAside" />
//                         <div className="appForm">
//                             <div className="formTitle">               
//                                 <Route path="/">
//                                 <SignInForm />
//                                 </Route>
//                             </div>
//                         </div>
//                     </div>
//                     </Switch>
//                 </Router>
//             </AppContext.Provider>
//         );
//     }
// }

// export default App;