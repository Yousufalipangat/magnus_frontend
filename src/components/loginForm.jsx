import React, { useState } from "react";
import "../css/loginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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

  function checkUser(e){
     e.preventDefault();

     axios.post("http://localhost:8000/",{email:emailAddress,pass:password}).then((res)=>{
      if(res.data)
      {
        navigate('/home',{replace: true,state:{ email:emailAddress ,pass:password}})
      }
     }).catch((e)=>{
      alert('Give Valid Inputs');
     })

  }

  return (
    <form className="loginBox" onSubmit={(e)=>checkUser(e)}>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
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
        <label for="inputPassword5" className="form-label">
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

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Remember me
        </label>
      </div>
      <button type="submit" class="btn btn-primary mt-3">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
