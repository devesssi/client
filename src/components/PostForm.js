import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PostForm = ({ communityId }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState([]); // Store media URLs
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        console.log("Decoded user ID:", decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handlePost = async () => {
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }

    if (!communityId) {
      console.error("Community ID is missing.");
      return;
    }

    try {
      const postData = {
        content,
        author: userId,
        community: communityId,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media, // Media URLs from the backend
      };

      console.log("Sending post data:", postData);

      const res = await axios.post(
        "http://localhost:5000/api/posts/create",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created successfully:", res.data);
      alert("Post created!");

      // Reset form fields
      setContent("");
      setTags("");
      setMedia([]); // Clear media after posting
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
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      // Assuming the backend responds with an array of media URLs
      setMedia(res.data.mediaUrls); // Update the media state with URLs
    } catch (error) {
      console.error("Error uploading media:", error.response?.data || error.message);
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <textarea
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
          marginBottom: "10px",
        }}
        placeholder="Write a post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
          marginBottom: "10px",
        }}
        placeholder="Enter tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange} // Handle file selection
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
      />
      <button
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
          marginTop: "10px",
          display: "block",
          width: "100%",
        }}
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

export default PostForm;
