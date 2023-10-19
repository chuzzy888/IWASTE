import React, { useState } from 'react';
import supabase from './supabase';

const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageURL, setImageURL] = useState(''); // Store the image URL

  async function createPost() {
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Author:', author);
    console.log('Image URL:', imageURL);

    // Create a new blog post in Supabase with the provided image URL
    const { data, error } = await supabase.from('scriblo').insert([
      {
        title,
        content,
        author,
        time: new Date(), // Use the correct column name for date (time)
        image_url: imageURL, // Use the correct column name for the image URL
      },
    ]);

    if (error) {
      console.error('Error creating blog post:', error);
    } else {
      console.log('Blog post created:', data);
      setTitle('');
      setContent('');
      setAuthor('');
      setImageURL('');
    }
  }

  return (
    <div className="create-blog-post mt-5" >
      <h2 style={{fontFamily:"cursive", fontWeight:"900"}}> <span style={{color:"green", fontWeight:"900"}}>Create</span> "Blog for a Better Planet"</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="title-input"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        id="author-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        id="content-input"
      />
      <input
        type="text"
        placeholder="Image URL (Paste image address here)"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        id="image-url-input"
      />
      <button onClick={createPost}>Submit</button>

      {/* Add CSS styles here */}
      <style jsx>{`
        .create-blog-post {
          background: linear-gradient(135deg, #00b4db, #0083b0);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 900px;
          margin: 0 auto;
          background-image : url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80");
        }

        h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }

        input[type="text"],
        textarea {
          width: 100%;
          // height: 100px ;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        button {
          background: #007BFF;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 5px 20px;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default CreateBlogPost;
