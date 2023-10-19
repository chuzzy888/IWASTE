// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CreateBlogPost from './CreateBlogPost';
// import BlogPostList from './BlogPostList';
// import BlogPostDetail from './BlogPostDetail'; // Import the BlogPostDetail component

// function Navbar() {
//   return (
//     <Router>
//       <div className='nav'>
//         <div>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjU-4IoMpwxYsmw_dcqf6akNeTGdhNRn39Q&usqp=CAU"
//             alt=".."
//             className='navda'
//           />
//         </div>

//         <div className='navlink'>
//           <Link to="/createpost">
//             <button style={{ backgroundColor: 'white', color: 'black' }}>
//               Create Post
//             </button>
//           </Link>
//           <Link to="/" className='links'>Stories</Link>
//         </div>
//       </div>
//       <Routes>
//         <Route path="/createpost" element={<CreateBlogPost />} />
//         <Route path="/" element={<BlogPostList />} />
//         <Route path="/post/:postId" element={<BlogPostDetail />} /> {/* Define a route for BlogPostDetail */}
//       </Routes>
//     </Router>
//   );
// }

// export default Navbar;












import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import CreateBlogPost from './CreateBlogPost';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import CreateAccount from './CreateAccount';
import WasteTracking from './WasteTracking';
import { FaBloggerB } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { SiDynatrace } from "react-icons/si";



function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };
  return (
    <BrowserRouter>
      <>
        {['md'].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-dark mb-3">
            <Container fluid>
              <Navbar.Brand href="#">
                <h1 style={{ color: "white", fontWeight: "900" }}>IWA<span style={{ fontWeight: "900", color: "green" }}>STE</span></h1>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleToggleOffcanvas} style={{ backgroundColor: "white" }} />
              <Navbar.Offcanvas
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                style={{ width: '200px', height: "600px", backgroundColor: "black" }}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <h1 style={{ color: "white", fontWeight: "900" }}>IWA<span style={{ fontWeight: "900", color: "green" }}>STE</span></h1>

                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 gap-5 pe-3">
                    <Nav.Link as={Link} to='/' onClick={handleCloseOffcanvas} style={{ color: "white", fontWeight: "900" }}> <span style={{ color: "green" }}><FaBloggerB /></span> Blogs</Nav.Link>
                    <Nav.Link as={Link} to='/createpost' onClick={handleCloseOffcanvas} style={{ color: "white", fontWeight: "900" }}> <span style={{ color: "green" }}><IoIosCreate /></span> create Blog</Nav.Link>
                    <Nav.Link as={Link} to='/track' onClick={handleCloseOffcanvas} style={{ color: "white", fontWeight: "900" }}> <span style={{ color: "green" }}><SiDynatrace /></span> Track waste</Nav.Link>
                    <Nav.Link as={Link} to='/createaccount' onClick={handleCloseOffcanvas} style={{ color: "white", fontWeight: "900" }}> <span style={{ color: "blue" }}><MdAccountCircle /></span> Register</Nav.Link>

                  </Nav>

                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

        ))}
        <Routes>
          <Route path="/createpost" element={<CreateBlogPost />} />
          <Route path="/" element={<BlogPostList />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/track" element={<WasteTracking />} />
          <Route path="/post/:postId" element={<BlogPostDetail />} /> {/* Define a route for BlogPostDetail */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default OffcanvasExample;