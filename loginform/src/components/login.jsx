import UserIcon from "../assets/User_icon.webp";
import Email from "../assets/email_icon.webp";
import Password from"../assets/password_icon.webp";
import React, { useState } from 'react';

import "./login.css";



function Login(){
  const[action,setAction] = useState("Signup")
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] =useState("");
  //test case 
  // const handleSubmit = () => {
  //   console.log("Action:", action);
  //   console.log("Name:", name);
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };



  
  return(
    <div className = "container">
      <h1> Login & Signup form </h1>
      <div className="radius">
        <div className="inputs">
          {action ==="Signup" &&(
          <div className="name"> 
            <img src={UserIcon} alt="img"/>
            <input type="text" placeholder="your name" onChange={(e) => setName(e.target.value)}/>
          </div>)}
          <div className="email">
            <img src={Email} alt ="email"></img>
            <input type="email" placeholder="your email" onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className="password">
            <img src={Password} alt ="password"></img>
            <input type="password" placeholder="Password here" onChange={(e) => setPassword(e.target.value)}></input>
            
          </div>
          <div className="forgot">
            {action==="Signup" ? <div></div> : <button
        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", marginTop: "10px" }}
      >
        Forgot Password?
      </button>}
          </div>
        <div className="buttons" >
          <button onClick={()=>setAction("Login")} className={`submit ${action==="Login" ? "purple" : "gray"}`}> 
           
              
            Login

           </button>
          
          <button onClick={()=>setAction("Signup")} className={`submit ${action === "Signup" ? "purple" : "gray"}`}>
           
             Signup
          
          </button>
        </div>

        </div>
      </div>
      
      
    </div>
  )
}
export default Login;
