import React, { useState } from "react";
import "../css/loginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../assets/supportFile";


function LoginForm() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function updateMail(e) {
    setEmailAddress(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }


  axios.defaults.withCredentials = true;
  function checkUser(e){
     e.preventDefault();

     axios.post(`${BASE_URL}`,{email:emailAddress,pass:password}).then((result)=>{

      if(result.data.login)
      {
        navigate('/home')
      }
      else{
        alert('wrong credentials')
      }
     }).catch((e)=>{
        alert('sorry,something went wrong');
     })

  }

  return (
    <form className="loginBox" onSubmit={(e)=>checkUser(e)}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          
          onChange={(e) => {
            updateMail(e);
          }}
          value={emailAddress}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword5" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="inputPassword5"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => {
            updatePassword(e);
          }}
          value={password}
        />
        
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Remember me
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
