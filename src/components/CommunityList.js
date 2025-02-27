import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/communities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommunities(res.data.communities || []);
      } catch (err) {
        console.error("Error fetching communities:", err);
        setCommunities([]);
      }
    };

    fetchCommunities();
  }, [token]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>Communities</h1>

      {role === "professor" && (
        <Link to="/create-community">
          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          >
            Create Community
          </button>
        </Link>
      )}

      <div style={{ display: "grid", gap: "15px" }}>
        {communities.length === 0 ? (
          <p style={{ color: "#666", fontSize: "16px" }}>No communities available.</p>
        ) : (
          communities.map((community) => (
            <div
              key={community._id}
              style={{
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "#f8f9fa",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <h2 style={{ color: "#333", fontSize: "20px" }}>{community.name}</h2>
              <p style={{ color: "#555", fontSize: "14px" }}>{community.description}</p>
              <Link to={`/community/${community._id}`}>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  View Community
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
