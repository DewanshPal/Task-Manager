import React from "react";
import styles from "../../styles/home.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{
        backgroundImage:'url("https://source.unsplash.com/random?wallpapers")',
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        // border:'2px solid red',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.box}>
        <h1 style={{ color: "white" }}>Task Manager</h1>
        {localStorage.getItem("userData") ? (
     
          <div className={styles.afterLoginButtons}>
            <h1 style={{color:'white',fontFamily:'sans-serif'}}>
              Welcome {JSON.parse(localStorage.getItem("userData")).username.toUpperCase()}
            </h1>
            <div className={styles.buttons}>
            <Button variant="outlined" onClick={() => navigate(`/${JSON.parse(localStorage.getItem("userData"))._id}`)}>
              Your Tasks
            </Button>
            <Button variant="outlined" onClick={() => {
              localStorage.removeItem('userData')
              navigate("/")}}>
              Log Out
            </Button></div>
          </div>
        ) : (
          <div className={styles.buttons}>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        )}
        {/* https://source.unsplash.com/random?wallpapers */}
      </div>
    </div>
  );
};

export default Home;