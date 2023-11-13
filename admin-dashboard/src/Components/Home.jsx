import React from "react";
import Form from "./Form";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Signup from "./signup";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
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

export default Home;
