import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate();
  const [isUser, setIsUser] = useState(false);
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        // border: "2px solid red",
        justifyContent: "flex-start",
        backgroundColor: "grey",
      }}
    >
      <Tooltip title="Home" placement="top">
        <HomeIcon sx={{ margin: "0px 10px", color: "white" ,cursor:'pointer'}} onClick={()=>navigate('/')}/>
      </Tooltip>
      {!localStorage.getItem("userData") ? (
        <div>
          <Tooltip title="Login" placement="top">
          <LoginIcon sx={{ margin: "0px 10px", color: "white",cursor:'pointer' }} onClick={()=>navigate('/signin')}/>
          </Tooltip>
          <Tooltip title="Register" placement="top">
          <VpnKeyIcon sx={{ margin: "0px 10px", color: "white",cursor:'pointer' }} onClick={()=>navigate('/signup')} />

          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Log Out" placement="top">
        <LogoutIcon sx={{ margin: "0px 10px", color: "white",cursor:'pointer' }} onClick={() => {
              localStorage.removeItem('userData')
              navigate("/")}}/>

        </Tooltip>

      )}
    </div>
  );
};

export default Navbar;
// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>navbar</div>
//   )
// }

// export default Navbar;