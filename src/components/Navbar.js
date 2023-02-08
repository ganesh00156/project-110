import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import LogoutIcon from "@mui/icons-material/Logout";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <Grid sx={{ padding: 1 }} container spacing={3}>
      <Grid item sm={10} sx={{ paddingLeft: "50px" }}>
        <DonutSmallIcon />
      </Grid>
      <Grid item lg={2}>
        {currentUser ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </Grid>
    </Grid>
  );
};

export default Navbar;
