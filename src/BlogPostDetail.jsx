import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabase';
import { AiTwotoneDelete, AiOutlineClose, AiFillLike, AiOutlineSend } from 'react-icons/ai';
import './Loader.css'

const BlogPostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCommentMap, setNewCommentMap] = useState({});
    const [blogPosts, setBlogPosts] = useState([]);
    const [newLike, setNewLike] = useState('');
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [hasCommented, setHasCommented] = useState(false); // Add this state


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
            alert('Comment added! view comments in stories..', data);
            // Clear the comment input field for the specific post
            setNewCommentMap((prevCommentMap) => ({
                ...prevCommentMap,
                [postId]: '',
            }));
            setHasCommented(true);
            if (setHasCommented) {
                console.log('comment displayed');

            }
            // Refetch the blog posts to include the new comment
            fetchBlogPosts();
        }
    }

    useEffect(() => {
        async function fetchBlogPost() {
            try {
                const { data, error } = await supabase
                    .from('scriblo')
                    .select('*')
                    .eq('id', postId)
                    .single();

                if (error) {
                    console.error('Error fetching blog post:', error);
                    setError(error);
                } else {
                    setPost(data);
                }
            } catch (fetchError) {
                console.error('Error in fetchBlogPost:', fetchError);
                setError(fetchError);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogPost();
    }, [postId]); // Fetch when postId changes



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
                alert('Comment deleted!', data);
                // Refetch the blog posts to update the comments
                fetchBlogPosts();
            }
        } catch (deleteError) {
            console.error('Error in deleteComment:', deleteError);
        }
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

    }

    return (
        <div className='bg' style={{ backgroundColor: 'black' }}>
            {loading && (
                <div className='loaders'>
                    <div class="loader">
                        <div data-glitch="Loading..." class="glitch">Loading...</div>
                    </div>
                </div>
            )}

            {error && <div>Error: {error.message}</div>}

            {post && (
                <div className='blog-container'>
                    <div className='blog-card'>
                        <img src={post.image_url} alt='Post' className='trans' />
                        <div className='blog-card-content'>
                            <h3 className='blog-card-title'>{post.title}</h3>
                            <p className='blog-card-author'>Author: {post.author}</p>
                            <p>Time: {new Date(post.time).toLocaleString()}</p>
                            <p>{post.content}</p>
                            <div className='addbut'>

                                <input
                                    className='commentinput'
                                    type='text'
                                    placeholder='Your Comment..'
                                    value={newCommentMap[post.id] || ''}
                                    onChange={(e) =>
                                        setNewCommentMap((prevCommentMap) => ({
                                            ...prevCommentMap,
                                            [post.id]: e.target.value,
                                        }))
                                    }
                                />
                                {/* <button onClick={() => addComment(post.id)}> Comment</button> */}
                                <button onClick={() => addComment(post.id)} style={{ backgroundColor: "green" }}>

                                    <span style={{ color: "white" }}> <AiOutlineSend /></span>
                                </button>

                            </div>
                            <div>
                                {hasCommented || (post.comments && post.comments.length > 0) && (
                                    <div className='comments'>
                                        <button className="btn" onClick={setlike}>
                                            {/* ... (your existing like button) */}
                                        </button>
                                        <button onClick={() => openCommentModal(post)} className='view'>
                                            View Comments
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

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

                </div>



            )}
        </div>
    );
};

export default BlogPostDetail;
