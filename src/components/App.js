
import React from "react";
import LoginForm from "./loginForm";
import "../css/app.css";

function App() {
  return (
  <div className="app" >
  <div className="loginPageContent">
  <h1>Training 4U Academy</h1>
  <p>Login Credentials</p>
  <p>Email : train@urself.com</p>
  <p>Password : jobprogram</p>
  <h6>Learn Everything on Real-Time Scenarios</h6>
    </div>
     <LoginForm />
    </div>
  );
}

export default App;
