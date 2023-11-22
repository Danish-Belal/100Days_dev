import React, { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";

function ShowCourse() {
  const [cources, getAllcources] = useState({ courses: [] });
  useEffect(() => {
    function callback2(data2) {
      getAllcources(data2);
      console.log(cources);
    }

    function callback(data) {
      data.json().then(callback2);
    }

    fetch("http://localhost:3001/admin/courses", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(callback)
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cources.courses.map((course) => (
        <Course key={course._id} course={course} />
      ))}
    </div>
  );
}

export function Course(props) {
  return (
    <Card style={{ margin: 10, width: 300, minHeight: 200 }}>
      <Typography textAlign={"center"} variant="h5">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {props.course.description}
      </Typography>
    </Card>
  );
}

export default ShowCourse;
