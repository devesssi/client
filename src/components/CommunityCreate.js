import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CommunityCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/communities/create",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Community created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating community:", error);
      alert("Failed to create community.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
                <Navbar/>

      <h1 style={{ color: "#333", fontSize: "24px" }}>Create Community</h1>
      
      <input
        type="text"
        placeholder="Community Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      
      <button
        onClick={handleCreate}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Create
      </button>
    </div>
  );
};

export default CommunityCreate;
