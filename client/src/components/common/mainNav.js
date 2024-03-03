import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function mainNav() {
  return (
    <>
      <Navbar className="p-1" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Practice</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            {/* <Nav.Link href="/add">Add</Nav.Link> */}
            {/* <Nav.Link href="/update">Update</Nav.Link> */}
          </Nav>

          <Nav className="">
            <Nav.Link href="/">SignIn</Nav.Link>

            <Nav.Link href="/signup">SignUp</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default mainNav;
