import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const saveHandler = async (e) => {
    let update;

    e.preventDefault();
    const newMessage = {
      message: message,
      userId: auth.userId,
    };

    try {
      const config = {
        headers: {
          "x-auth-token": `${auth.token}`,
          "Content-Type": "application/json",
        },
      };

      if(newMessage.message == ""){
        window.alert("Message is Empty!");
      }
      else{
      update = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/auth/save`,
        newMessage,
        config
      );
      }

      if (update) {
        window.alert("Message has been sent!");
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  //File upload event implementation
  const fileUploadHandler = async (event) => {
    event.preventDefault();

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", auth.userId);

        const uploaded = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/auth/upload`,
          formData,
          {
            headers: {
              "x-auth-token": `${auth.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (uploaded) {
          window.alert("File has been uploaded, Successfully");
          window.location = "/";
        } else {
          window.alert("Something went wrong");
        }
      } else {
        window.alert("Please select a file to upload.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Select file event implementation
  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div
      style={{
        background: "#000000" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to left, #000000,#000000)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to left,#000000, #000000)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      .
      <center>
        <Card
          className="text-center"
          style={{
            width: "28rem",
            marginTop: "5rem",
            marginBottom: "5rem",
            boxShadow: "5px 8px 35px ",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <Card.Body>
            <h4>Message</h4>

            <div className="mb-3">
              <input
                type="text"
                name="text"
                className="form-control mb-6"
                id="message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Enter Message Here"
              />
              <div className="mt-3">
                <Button onClick={saveHandler}>Save Message</Button>
              </div>
            </div>

            {auth.role === "Worker" ? null : (
              <Form onSubmit={fileUploadHandler}>
                <div className="mb-0">
                  <h4>Upload File Here</h4>
                  <div>
                    <input
                      class="form-control form-control-lg"
                      onChange={handleFileSelect}
                      type="file"
                    />
                  </div>
                  <div className="mt-3">
                    <Button type="submit">Upload File</Button>
                  </div>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </center>
      .
    </div>
  );
};

export default Home;
