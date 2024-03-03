import React, { useState } from "react";
import { Container, Button, Form, Dropdown, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Avatar, setAvatar] = useState("");
  // State to hold the selected role
  const [selectedRole, setSelectedRole] = useState(""); // Initial value can be an empty string or the default role

  // Function to handle dropdown item selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const Data = {
    name: Name,
    email: Email,
    password: Password,
    phone: Phone,
    avatar: Avatar,
    role: selectedRole
  };

  console.log("data", Data);

  const addData = async (e) => {
    e.preventDefault();

    if (!Name || !Email || !Password || !Phone || !Avatar || !selectedRole) {
      toast("All Data Muse Included", { type: "error", autoClose: 1500 });
    } else {
      await axios
        .post("http://localhost:5000/signup", Data)
        .then((res) => {
          console.log(res.data);
          toast("Added Successfully", { type: "success", autoClose: 1500 });
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
    navigate("/");
  };

  return (
    <Container className="dashboard-body d-flex justify-content-center align-items-center">
      <Form className="border border-2 py-3 px-5 rounded-4 bg-info shadow">
        <h3 className="text-warning text-center py-3">SignUp</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Control
            type="tel"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Control
            type="tel"
            placeholder="Avatar"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Form.Group>

        <Dropdown onSelect={handleRoleSelect}>
          <Dropdown.Toggle
            className="w-100"
            variant="secondary"
            id="dropdown-basic"
          >
            {selectedRole
              ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
              : "Select Role"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
            <Dropdown.Item eventKey="student">Student</Dropdown.Item>
            <Dropdown.Item eventKey="faculty">Faculty</Dropdown.Item>
            <Dropdown.Item eventKey="visitor">Viewer</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="primary" type="submit" onClick={addData}>
            SignUp
          </Button>
          <Button
            className="px-4"
            variant="primary"
            type="submit"
            onClick={goToHomePage}
          >
            Back
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Add;
