import React, { useState } from "react";
import style from "../../styles/signin.module.css";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import ServerURL from "../../ServerUrl";
function Signin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [progressVisibility,setProgressVisibility]=useState(false);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
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
    setProgressVisibility(true);
    const res = await fetch(`${ServerURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/");
      toast("You are successfully logged in!", {
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
    } else if (res.status === 400) {
      toast("Invalid Credentials!", {
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
    } else {
      toast("Network Issue!", {
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
    }
    setProgressVisibility(false);
  };
  return (
    <div className={style.container}>
      {(progressVisibility)?<LinearProgress color="secondary" />:null}
      <div className={style.demo}>
        <h1>Sign In</h1>
        <div className={style.main}>
          <div>
            <TextField
              label="Email"
              maxRows={4}
              name="email"
              sx={{ width: "100%" }}
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Password"
              maxRows={4}
              name="password"
              type={"password"}
              sx={{ width: "100%" }}
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          variant="contained"
          className={style.btn}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <NavLink to="/signin/forgetpass">Forget Password?</NavLink>
        <NavLink to="/signup">Don't have an account?</NavLink>
      </div>
    </div>
  );
}

export default Signin;
