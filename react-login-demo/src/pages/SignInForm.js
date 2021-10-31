import React, { Component, useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";


const SignInForm = () => {

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

export default SignInForm;

// class SignInForm extends Component {
//     constructor() {
//       super();
  
//       this.state = {
//         email: "",
//         password: ""
//       };
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       let target = event.target;
//       let value = target.type === "checkbox" ? target.checked : target.value;
//       let name = target.name;
  
//       this.setState({
//         [name]: value
//       });
//     }
  
//     async handleSubmit(event) {
//       event.preventDefault();
  
//       const { userHasAuthenticated } = useAppContext();
  
//       console.log("The form was submitted with the following data:");
//       console.log(this.state);
  
//       try {
//           await Auth.signIn(this.state.email, this.state.password);
//           alert("Logged in");
//           userHasAuthenticated(true);
//         } catch (e) {
//           alert(e.message);
//         }
//     }
  
//     render() {
//       return (
//         <div className="formCenter">
//           <form className="formFields" onSubmit={this.handleSubmit}>
//             <div className="formField">
//               <label className="formFieldLabel" htmlFor="email">
//                 E-Mail Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="formFieldInput"
//                 placeholder="Enter your email"
//                 name="email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//               />
//             </div>
  
//             <div className="formField">
//               <label className="formFieldLabel" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="formFieldInput"
//                 placeholder="Enter your password"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//               />
//             </div>
  
//             <div className="formField">
//               <button onClick={this.testHook} className="formFieldButton">Sign In</button>{" "}
//             </div>
  
//           </form>
//         </div>
//       );
//     }
//   }
  
//   export default SignInForm;
  
