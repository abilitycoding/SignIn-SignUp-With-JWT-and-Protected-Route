import React, { useState } from "react";
import { Container, Button, Form, Dropdown, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //   console.log(location);
  const user = location.state;
  //   console.log(user);

  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");

  const Data = {
    name: Name,
    password: Password
  };

  //   console.log("data", Data);

  const addData = async (e) => {
    e.preventDefault();

    if (!Name || !Password) {
      toast("Register Your Data", { type: "error", autoClose: 1500 });
    } else {
      await axios
        .post(`http://localhost:5000/signIn`, Data)
        .then((res) => {
          console.log(res.data);
          toast("Welcome Back", { type: "success", autoClose: 1500 });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <Container className="dashboard-body d-flex justify-content-center align-items-center">
      <Form className="border border-2 rounded-4 px-5 py-3 bg-info shadow">
        <h3 className="py-4 text-warning text-center">SignIn</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit" onClick={addData}>
            SignIn
          </Button>
          <Button variant="primary" type="submit" onClick={goToSignUpPage}>
            SignUp
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default SignIn;
