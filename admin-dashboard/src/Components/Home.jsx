import React, { useEffect, useState } from "react";
import Form from "./Form";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Signup from "./signup";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  
  
  useEffect(() => {
    function decodeToken(token) {
      try {
        if (!token) {
          return null;
        }
  
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
  
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
  
    const token = localStorage.getItem('token');
    console.log('Token:', token);
  
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        const username = decodedToken.username;
        setUserName(username);
        console.log('Username:', username);
      } else {
        // Handle the case when there is an issue decoding the token
      }
    } else {
      // Handle the case when there is no token
    }
  }, []);

  if (userName) {
    return <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 4
  }}>
      <div>
          <Typography variant={"h6"}>Coursera</Typography>
      </div>

      <div style={{display: "flex"}}>
          <div>
              {userName}
          </div>
          <div style={{marginRight: 10}}>
              <Button
                  variant={"contained"}
                  onClick={() => {
                      localStorage.setItem("token", null);
                      window.location = "/";
                  }}
              >Logout</Button>
          </div>
      </div>
  </div>
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
          }}
        >
          <div>
            <Typography variant={"h6"}>Coursera</Typography>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"contained"}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </div>
            <div>
              <Button
                variant={"contained"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
