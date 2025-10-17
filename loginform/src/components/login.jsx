import UserIcon from "../assets/User_icon.webp";
import Email from "../assets/email_icon.webp";
import Password from"../assets/password_icon.webp";
import React, { useState } from 'react';

import "./login.css";



function Login(){
  const[action,setAction] = useState("login")


  
  return(
    <div className = "container">
      <div className="radius">
        <div className="inputs">
          <div className="name">
            <img src={UserIcon} alt="img"/>
            <input type="text" placeholder="your name"/>
          </div>
          <div className="email">
            <img src={Email} alt ="email"></img>
            <input type="email" placeholder="your email"></input>
          </div>
          <div className="password">
            <img src={Password} alt ="password"></img>
            <input type="password" placeholder="Password here"></input>
            
          </div>
          <div className="forgot">
            <button
        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", marginTop: "10px" }}
      >
        Forgot Password?
      </button>
          </div>
          <div> 
            <div className="Lbtn">
            <button>Login</button>

          </div>
          
          <div className="Sbtn">
            <button>Signup</button>
          </div>
          </div>
          

        </div>
      </div>
      
      
    </div>
  )
}
export default Login;
