import React,{useState} from 'react';
import style from '../../styles/signup.module.css'
import TextField from '@mui/material/TextField';
import { NavLink,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import {toast} from 'react-toastify';
import ServerURL from '../../ServerUrl';
export default function Signin() {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
    cpassword:""
  })
  const [progressVisibility,setProgressVisibility]=useState(false);
  const handleUser=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setUser({...user,[name]:value});
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();

    const {username,email,password,cpassword}=user;
    if(!username||!email||!password||!cpassword){
      toast("All fields are Mandatory!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
      return;
    }
    if(password!=cpassword){
      toast("password not matching!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
      return;}
    setProgressVisibility(true);
    // --------------------------------------------------
    const res = await fetch(`${ServerURL}/auth/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,email,password}),
      mode: 'cors',
    })
    const data=await res.json();
    if(res.status===401 || !data){
      toast("please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });}
      else if(res.status===422 || !data){
        toast("Eamil already exists", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
          theme: "colored",
        });}
      else if(res.status===400 || !data){
        toast("password not matching", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
          theme: "colored",
        });

    }else{
      toast("Registered Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
    
      console.log("Registered Successfull");
      navigate("/signin")
    }
    setProgressVisibility(false);
  }
  return (
    <div className={style.container}>
      {(progressVisibility)?<LinearProgress color="secondary" />:null}
    <div className={style.demo}>
    <h1>Sign Up</h1>
    <div className={style.main}>
      <div>
        <TextField
          label="Username"
          maxRows={4}
          name="username"
          value={user.username}
          onChange={handleUser}
        />
        <TextField
          label="Email"
          maxRows={4}
          name="email"
          value={user.email}
          onChange={handleUser}
        />
      </div>
    
      <div>
      <TextField
          label="Create Password"
          type={'password'}
          maxRows={4}
          name="password"
          value={user.password}
          onChange={handleUser}
        />
        <TextField
          label="Confirm Password"
          type={'password'}
          maxRows={4}
          name="cpassword"
          value={user.cpassword}
          onChange={handleUser}
        />
      </div>
    </div>
    <Button variant="contained" sx={{marginBottom:'10px'}} className={style.btn} onClick={handleSubmit}>Sign Up</Button>
    <NavLink to="/signin">Already have an account?</NavLink>
    </div></div>
  );
}