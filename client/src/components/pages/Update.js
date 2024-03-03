import React, { useState } from "react";
import { Container, Button, Form, Dropdown, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
//   console.log(location);
  const user = location.state;
  console.log(user);
  const [Name, setName] = useState(user?.name);
  const [Email, setEmail] = useState(user?.email);
  const [Password, setPassword] = useState(user?.password);
  const [Phone, setPhone] = useState(user?.phone);
  const [Avatar, setAvatar] = useState(user?.avatar);

  const Data = {
    name: Name,
    email: Email,
    password: Password,
    phone: Phone,
    avatar: Avatar,
  };

  //   console.log("data", Data);

  const updateData = async (e) => {
    e.preventDefault();

    if (!Name || !Email || !Password || !Phone || !Avatar) {
      toast("Register Your Data", { type: "error", autoClose: 1500 });
    } else {
      await axios
        .put(
          `http://localhost:5000/update/${user._id}`,
          Data
        )
        .then((res) => {
          // console.log(res.data);
          toast("Updated Successfully", { type: "success", autoClose: 1500 });
          setTimeout(() => {
            navigate("/home");
          }, 2000); 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const goToHomePage = () => {
    navigate("/home");
  };

  return (
    <Container className="mb-3">
      <h3 className="py-4 text-warning">Update Page</h3>
      <div className="vh-60 d-flex justify-content-center align-items-center ">
        <Form className="border border-2 py-3 px-5 rounded-4 bg-info">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Avatar"
              value={Avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Role</Form.Label>

          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              Select Role
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Faculty</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Viewer</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="d-flex gap-3 mt-4">
            <Button variant="primary" type="submit" onClick={updateData}>
              Update
            </Button>
            <Button variant="primary" type="submit" onClick={goToHomePage}>
              Back
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Update;
