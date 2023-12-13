import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import axios from "axios";

function Course() {
  const { courseId } = useParams();
  console.log("Main Course renderd");
  const setCourse = useSetRecoilState(courseState);

  useEffect(() => {
    console.log("HELLLLLO");
    const fetchData = async () =>{
      try{
        const resData = await axios.get(`http://localhost:3001/admin/course/654480dbcdf65fe804231673`, {
          headers: {
            authorization:  `Bearer ${localStorage.getItem('token')}`
          },
        });

        console.log("hello");
        // console.log(resData.data , "Hell0..............");
        setCourse(resData.data.course);

        
      }catch(error){
        console.log("Catched error");
        console.log(error);
      }
    }
    fetchData ()
  }, []);
  return (
    <div>
      <Cources />
      <UpdateCourse courseId={courseId} />
    </div>
  );
}

function UpdateCourse(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [courses, setCourses] = useRecoilState(courseState);
  console.log("Update course render");
  return (
    <div div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
        <Typography>Update course details</Typography>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="Title"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          label="Description"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
          label="Image link"
          variant="outlined"
        />

        <Button
          size={"large"}
          variant="contained"
          onClick={() => {
            function callback2(res) {
              let updatedCourses = [];
              setCourses({
                id: props.courseId,
                title: title,
                description: description,
                imageLink: imageLink,
              });
            }
            function callback1(data) {
              return data.json().then(callback2);
            }
            fetch(`http://localhost:3001/admin/course/${props.courseId}`, {
              method: "PUT",
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: imageLink,
                published: true,
              }),
            }).then(callback1);
          }}
        >
          Update
        </Button>
      </Card>
    </div>
  );
}

export function Cources() {
  const courses = useRecoilValue(courseState);

  console.log("coursecard rendered");
  console.log(courses);
  if (!courses) {
    return "loading...";
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {courses.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {courses.description}
        </Typography>
        <img src={courses.imageLink} style={{ width: 300 }}></img>
      </Card>
    </div>
  );
}

export default Course;

export const courseState = atom({
  key: "courseState",
  default: {},
});
