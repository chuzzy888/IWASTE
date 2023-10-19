import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BsArrowUpCircleFill} from "react-icons/bs";

function ContainerInsideExample() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <Navbar  expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#"> <h1 style={{color:"black"}}><BsArrowUpCircleFill/></h1></Navbar.Brand>
        <div className="footer-text">
          <span style={{color:'gold'}}>&copy;</span> {currentYear}  Developed By <span style={{fontFamily:"cursive"}}>Chizu Praise</span>
        </div>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
