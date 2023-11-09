import React from "react";
import Form from "./Form";
import Button from "@mui/material/Button";

function Home() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#eeee",
          height: "100vh",
          width: "100wh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10",
          }}
        >
          <div>
            <h3>Coursera</h3>
          </div>
          <div style={{}}>
            <Button variant="contained">Signup</Button>
            <Button variant="contained">Login</Button>
          </div>
        </div>
        <div style={{
          display : 'flex',
          justifySelf : 'center'
        }}>
          <Form />
      </div>
      </div>
     
      </>
      
      
   
  );
}

export default Home;
