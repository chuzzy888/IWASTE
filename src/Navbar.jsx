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
import { FaBloggerB } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";




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
          <Navbar key={expand} expand={expand} className="bg-current mb-3">
            <Container fluid>
              <Navbar.Brand href="#">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0Ulzsv892Ef0mog0fyz4R-fCBpS9K8gqCA&usqp=CAU" alt="...." style={{height:"80px"}}/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleToggleOffcanvas} style={{ backgroundColor: "white" }} />
              <Navbar.Offcanvas
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                style={{ width: '200px', height: "600px", backgroundColor: "white" }}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0Ulzsv892Ef0mog0fyz4R-fCBpS9K8gqCA&usqp=CAU" alt="...." style={{height:"80px"}}/>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 gap-5 pe-3">
                    <Nav.Link as={Link} to='/' onClick={handleCloseOffcanvas} style={{ color: "black", fontWeight: "900" }}> <span style={{ color: "green" }}><FaBloggerB /></span> Blogs</Nav.Link>
                    <Nav.Link as={Link} to='/createpost' onClick={handleCloseOffcanvas} style={{ color: "green", fontWeight: "900" }}><h5 style={{ color: "blue"  }}><IoIosCreate /> post</h5> </Nav.Link>
                  </Nav>

                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

        ))}
        <Routes>
          <Route path="/createpost" element={<CreateBlogPost />} />
          <Route path="/" element={<BlogPostList />} />
          <Route path="/post/:postId" element={<BlogPostDetail />} /> {/* Define a route for BlogPostDetail */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default OffcanvasExample;