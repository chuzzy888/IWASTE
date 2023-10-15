import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateBlogPost from './CreateBlogPost';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail'; // Import the BlogPostDetail component

function Navbar() {
  return (
    <Router>
      <div className='nav'>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjU-4IoMpwxYsmw_dcqf6akNeTGdhNRn39Q&usqp=CAU"
            alt=".."
            className='navda'
          />
        </div>

        <div className='navlink'>
          <Link to="/createpost">
            <button style={{ backgroundColor: 'white', color: 'black' }}>
              Create Post
            </button>
          </Link>
          <Link to="/" className='links'>Stories</Link>
        </div>
      </div>
      <Routes>
        <Route path="/createpost" element={<CreateBlogPost />} />
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:postId" element={<BlogPostDetail />} /> {/* Define a route for BlogPostDetail */}
      </Routes>
    </Router>
  );
}

export default Navbar;
