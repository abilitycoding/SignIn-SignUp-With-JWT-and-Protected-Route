import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import axios from "axios";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [Users, setUsers] = useState([]);

  // console.log(Users);

  const getApiData = async () => {
    await axios
      .get("http://localhost:5000/")
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApiData();
  }, []);

  const goToUpdatePage = (user) => {
    // console.log(user);
    navigate("/update", { state: user });
  };

  const handleDelete = (userId) => {
    axios
      .delete("http://localhost:5000/delete", {
        data: { id: userId }
      })
      .then((res) => {
        console.log(res.data);
        // Remove the deleted user from the state
        setUsers(Users.filter((user) => user._id !== userId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container className="my-5">
      <h3 className="my-5 text-warning">Home Page</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={user.avatar}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-circle"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td className="action-td d-flex align-items-center gap-3 fs-3 text-info">
                <GrDocumentUpdate
                  onClick={() => {
                    goToUpdatePage(user);
                  }}
                />
                <AiFillDelete
                  onClick={() => {
                    handleDelete(user._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
