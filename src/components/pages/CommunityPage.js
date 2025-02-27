import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false); // Joining state
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        console.log("Fetching communities...");
        const res = await axios.get("http://localhost:5000/api/communities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched communities:", res.data);
        setCommunities(res.data || []);
      } catch (err) {
        console.error("Error fetching communities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [token]);

  // Handle Join Community
  const handleJoinCommunity = async (communityId) => {
    if (joining) return; // Prevent multiple clicks
    setJoining(true);

    try {
      if (!token) {
        alert("Please log in to join communities.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/communities/join",
        { communityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Joined successfully:", response.data);
      alert("Successfully joined the community!");

      // Update community state to remove "Join" button
      setCommunities((prevCommunities) =>
        prevCommunities.map((c) =>
          c._id === communityId ? { ...c, members: [...c.members, String(userId)] } : c
        )
      );
    } catch (error) {
      console.error("❌ Error joining community:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Error joining community.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Communities
      </h1>

      {/* Show Create Button for Professors */}
      {role === "professor" && (
        <Link to="/create-community">
          <button
            style={{
              display: "block",
              margin: "10px auto",
              padding: "12px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            + Create Community
          </button>
        </Link>
      )}

      {/* Loading State */}
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
          Loading communities...
        </p>
      ) : communities.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
          No communities available.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            paddingTop: "20px",
          }}
        >
          {communities.map((community) => (
            <div
              key={community._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderLeft: "5px solid #28a745",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <h2 style={{ marginBottom: "10px", fontSize: "20px", color: "#333" }}>
                {community.name}
              </h2>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.5" }}>
                {community.description}
              </p>

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Link to={`/community/${community._id}`}>
                  <button
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "background 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#218838")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#28a745")
                    }
                  >
                    View Community
                  </button>
                </Link>

                {/* Show "Join Community" button only for students who haven't joined */}
                {role === "student" &&
                  !community.members.includes(String(userId)) && (
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: joining ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: joining ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "background 0.3s",
                      }}
                      onClick={() => handleJoinCommunity(community._id)}
                      disabled={joining}
                      onMouseOver={(e) =>
                        !joining && (e.target.style.backgroundColor = "#0056b3")
                      }
                      onMouseOut={(e) =>
                        !joining && (e.target.style.backgroundColor = "#007bff")
                      }
                    >
                      {joining ? "Joining..." : "Join Community"}
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
