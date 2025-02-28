import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";

const PostForm = ({ communityId }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handlePost = async () => {
    if (!userId || !communityId) {
      console.error("User ID or Community ID is missing.");
      return;
    }

    try {
      const postData = {
        content,
        author: userId,
        community: communityId,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media,
      };

      await axios.post("http://localhost:5000/api/posts/create", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Post created!");
      setContent("");
      setTags("");
      setMedia([]);
    } catch (error) {
      console.error("Error posting:", error.response?.data || error.message);
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("media", files[i]);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMedia(res.data.mediaUrls);
    } catch (error) {
      console.error("Error uploading media:", error.response?.data || error.message);
    }
  };

  return (
    <div className="post-form-container">
      <textarea
        className="post-textarea"
        placeholder="Write a post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        className="post-input"
        placeholder="Enter tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input type="file" multiple className="post-file-input" onChange={handleFileChange} />
      <button className="post-button" onClick={handlePost}>Post</button>
      <style>{`
        .post-form-container {
          padding: 20px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: auto;
        }
        .post-textarea, .post-input, .post-file-input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-size: 15px;
          margin-bottom: 12px;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .post-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          transition: 0.3s;
        }
        .post-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default PostForm;