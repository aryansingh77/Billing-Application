import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
/*  Importing all the Images  */ 
import email from "../Components/Assets/email.png";
import password from "../Components/Assets/password.png";
import person from "../Components/Assets/person.png";
import sigin from "./Assets/signin.svg";
import login from "./Assets/login.png";

const LoginSignup = (props) => {
  const [action, setAction] = useState("Login");
  const [userName, setName] = useState("");
  const [userMail, setEmailValue] = useState("");
  const [userPassword, setPasswordValue] = useState("");
  const [userType, setUserType] = useState("USER");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = props.pageTitle;
  }, [props.pageTitle]);

  const handleSignUp = async () => {
    if (!userName || !userMail || !userPassword) {
      return;
    }
    const data = {
      userName: userName,
      userMail: userMail,
      userPassword: userPassword,
      userType: userType,
    };
    console.log("Data to be sent:", data);

    const url = "http://localhost:5000/api/register";

    try {
      console.log("data", data);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) { // Signup successful, handle success
        toast.success("Signup successful");
        setAction("Login");
        setEmailValue("");
        setPasswordValue("");
        navigate('/');
        console.log("Signup successful");
      } else { // Handle signup error
        toast.error("User Already Exist or Error signing up");
        console.error("Error signing up");
      }
    } catch (error) { // Handle network error
      console.error("Network error", error);
    }
  };

  const handleLogin = async () => {
    if (!userMail || !userPassword) {
      return;
    }
    const data = {
      userMail: userMail,
      userPassword: userPassword,
      userType: userType
    };
    console.log("Data to be sent:", data);

    const url = "http://localhost:5000/api/login";

    try {
      console.log("data", data);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) { // Login successful, handle success
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log("token", token);
        toast.success("Login successful");

        if (userType === 'ADMIN') {
          navigate('/Admin-Portal', { state: { userEmail: userMail} });
        } else {
          navigate('/User-Portal', { state: { userEmail: userMail} });
        }
        console.log("Login successful");
      } else { // Handle login error
        toast.error("Error logging in");
        console.error("Error logging in");
      }
    } catch (error) { // Handle network error
      console.error("Network error", error);
    }
  };

  return (
    <>
    <div className="mainHeading">Billing Application</div>
      <div className="container">
      
        <div className="image-container">
          {action === "SignUp" ? (
            <img className="image" src={sigin} alt="" />
          ) : (
            <img className="image2" src={login} alt="" />
          )}
        </div>
        <div className="form-container">
        
          <div className="header">
            <div className="text">{action}</div>
          </div>
          <div className="inputs">
            {action !== "Login" && (
              <div className="input">
                <img src={person} alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input">
              <img src={email} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={userMail}
                onChange={(e) => setEmailValue(e.target.value)}/>
            </div>
            <div className="input">
              <img src={password} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setPasswordValue(e.target.value)}/>
            </div>
            <div className="inputRadio">
              <label>
                <input
                  type="radio"
                  value="USER"
                  checked={userType === "USER"}
                  onChange={() => setUserType("USER")}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="ADMIN"
                  checked={userType === "ADMIN"}
                  onChange={() => setUserType("ADMIN")}
                />
                Admin
              </label>
            </div>

          </div>
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                console.log("SignUp Button Clicked button clicked");
                setAction("SignUp");
                handleSignUp();
              }}>Sign Up</div>
            <div
              className={action === "SignUp" ? "submit gray" : "submit"}
              onClick={() => {
                console.log("Login button clicked");
                setAction("Login");
                handleLogin();
              }}>Login</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;