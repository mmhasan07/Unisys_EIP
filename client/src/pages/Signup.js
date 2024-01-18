import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { signupRoute } from "../utils/APIRoutes";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => { // frontend validation for proper details
    const { password, confirmpassword, username, email } = values;
    if (username.length < 3) {
      toast.error("username must be minimum 3 characters", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast.error("password must be minimum 6 characters", toastOptions);
      return false;
    }
    else if (email === "") {
      toast.error("must enter email id", toastOptions);
      return false;
    }
    else if (password !== confirmpassword) {
      toast.error("confirmpassword and password did not match", toastOptions);
      return false;
    }
    else return true;
  }

  const handleOnSubmit = async(e) => { // submit to the server
    e.preventDefault();
    try{

      if (handleValidation() === true) {
        const { password, username, email } = values;
  
        const resp = await axios.post(signupRoute, {
          username,
          email,
          password
        }); 
  
        const data = resp.data
    
        if(resp.data.status === true){
          sessionStorage.setItem(process.env.REACT_APP_CLIENT_KEY, data.authToken);
          navigate('/')
        }
        else  toast.error(data.msg, toastOptions);
        
      }
    }catch(err){
      const data = err.response?.data?.msg || "some error occoured"
      toast.error(data, toastOptions);
    }

  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
        >
          <div className="brand">
            <h1>Signup</h1>
          </div>

          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="email"
            placeholder="Enter email id"
            name="email"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(e) => handleOnChange(e)}
          />
          <button type="submit">Create User</button>
          <span>Already a member?? <Link to='/login'>Login</Link></span>
        </form>

      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #00E58E;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #00E58E;
      outline: none;
    }
  }
  button {
    background-color: #00E58E;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #00E58E;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #00E58E;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Signup;
