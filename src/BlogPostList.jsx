import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import Categories from './Categories'
import { Link } from 'react-router-dom';
import { AiTwotoneDelete, AiOutlineClose, AiFillLike } from "react-icons/ai";

const BlogPostList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  // const [newCommentMap, setNewCommentMap] = useState({});
  const [newLike, setNewLike] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


  async function fetchBlogPosts() {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('scriblo')
        .select('*')
        .order('time', { ascending: false });

      if (postsError) {
        console.error('Error fetching blog posts:', postsError);
        setError(postsError);
      } else {
        // Fetch comments for each blog post
        const postsWithComments = await Promise.all(
          postsData.map(async (post) => {
            const { data: commentsData, error: commentsError } = await supabase
              .from('scriblo_comments')
              .select('*')
              .eq('post_id', post.id);

            if (commentsError) {
              console.error('Error fetching comments for post:', commentsError);
              return post;
            }

            return {
              ...post,
              comments: commentsData,
            };
          })
        );

        setBlogPosts(postsWithComments);
      }
    } catch (fetchError) {
      console.error('Error in fetchBlogPosts:', fetchError);
      setError(fetchError);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, [4000]);
    }
  }

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  async function addComment(postId) {
    const newCommentText = newCommentMap[postId];

    if (!newCommentText) {
      return; // Don't add an empty comment
    }

    const { data, error } = await supabase.from('scriblo_comments').insert([
      {
        post_id: postId,
        content: newCommentText,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      alert('Comment added:', data);
      // Clear the comment input field for the specific post
      setNewCommentMap((prevCommentMap) => ({
        ...prevCommentMap,
        [postId]: '',
      }));
      // Refetch the blog posts to include the new comment
      fetchBlogPosts();
    }
  }

  async function addLike(postId) {
    const { data, error } = await supabase.from('scriblo_likes').insert([
      {
        post_id: postId,
        user_id: newLike,
      },
    ]);

    if (error) {
      console.error('Error adding like:', error);
    } else {
      console.log('Like added:', data);
      setNewLike('');
    }
  }

  async function deleteComment(postId, commentId) {
    try {
      const { data, error } = await supabase
        .from('scriblo_comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        console.error('Error deleting comment:', error);
      } else {
        alert('Comment deleted !', data);
        alert('NOTE: comment will no longer appear in comment section', data);
        // Refetch the blog posts to update the comments
        fetchBlogPosts();
      }
    } catch (deleteError) {
      console.error('Error in deleteComment:', deleteError);
    }
  }

  if (loading) {
    return <div className='loaders'>
      <svg class="loader" width="240" height="240" viewBox="0 0 240 240">
        <circle class="loader-ring loader-ring-a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
        <circle class="loader-ring loader-ring-b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
        <circle class="loader-ring loader-ring-c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
        <circle class="loader-ring loader-ring-d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
      </svg>

    </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to open the comment modal
  const openCommentModal = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  // Function to close the comment modal
  const closeCommentModal = () => {
    setSelectedPost(null);
    setShowCommentModal(false);
  };

  const setlike = () => {
    alert('like added')
    alert('View Likes is still under development')

  }

  return (
    <div className='bg' style={{ backgroundColor: "black" }}>

      <div className='blogs'>
      <div>
        <h1 className='heading'>  w3lcome To <span style={{color:"green"}}> Environmental <span style={{color:"white"}}>/</span> Sustainability </span> <span style={{color:"orangered"}}>Blog <span style={{color:"whitesmoke"}}>And </span>News</span>..</h1>
      </div>
      

      </div>

      <div className='blog-container'>
        {blogPosts.map((post) => (
          <div key={post.id} className='blog-card'>
            <img src={post.image_url} alt='Post' className='trans' />
            <div className='blog-card-content'>
              <h3 className='blog-card-title'>{post.title}</h3>
             
              <p className='blog-card-time'>Time: {new Date(post.time).toLocaleString()}</p>
              <Link to={`/post/${post.id}`}>Read More</Link>
              <div className='addbut'>
           
              </div>
              {post.comments && post.comments.length > 0 && (
                <div className='comments'>
                  <button className="btn" onClick={setlike}>

                    <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                      <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                    </svg>
                  </button>
                  <button onClick={() => openCommentModal(post)} className='view'>View Comments</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedPost && (
        <div className={`comment-modal ${showCommentModal ? 'active' : ''}`}>
          <div className='comment-modal-content'>
            <h3 className='comment-modal-title'>Comments for {selectedPost.title}</h3>
            {selectedPost.comments &&
              selectedPost.comments.map((comment) => (
                <div key={comment.id} className='comment'>
                  <p>{comment.content}</p>
                  <p>{comment.user_id}</p>
                  <p>{comment.created_at}</p>
                  <div className='comment-actions'>
                    <button onClick={() => deleteComment(selectedPost.id, comment.id)} ><span style={{ color: "red" }}> <AiTwotoneDelete /></span></button>
                    <button onClick={setlike} > <AiFillLike /></button>
                  </div>
                </div>
              ))}
            <button onClick={closeCommentModal}> <span style={{ color: "green" }}><AiOutlineClose /></span></button>
          </div>
        </div>
      )}
      <Categories />
    </div>
  );
};

export default BlogPostList;















