import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = ({ communityId }) => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      if (!communityId) {
        console.error("No communityId provided!");
        return;
      }

      try {
        console.log("Fetching posts for community:", communityId);

        const res = await axios.get(`http://localhost:5000/api/posts/community/${communityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched response data:", res.data); // ✅ Debugging

        if (res.data.success) {
          setPosts(res.data.posts); // 🔥 Make sure posts are being set!
        } else {
          console.error("Failed to fetch posts:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
      }
    };

    fetchPosts();
  }, [communityId, token]);

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#2c3e50",
          textAlign: "center",
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        Community Posts
      </h2>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#7f8c8d" }}>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              padding: "15px 20px",
              marginBottom: "20px",
              borderBottom: "1px solid #ececec",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "10px",
                color: "#2c3e50",
                wordWrap: "break-word",
              }}
            >
              {post.content}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#7f8c8d",
                marginTop: "5px",
                fontStyle: "italic",
              }}
            >
              By: <strong>{post.author ? post.author.name : "Unknown"}</strong>
            </p>

            {/* Render Media */}
            {post.media && post.media.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                {post.media.map((mediaUrl, index) => {
                  const fileExtension = mediaUrl.split(".").pop().toLowerCase();

                  // Check if the media is an image or video
                  if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
                    return (
                      <img
                        key={index}
                        src={`http://localhost:5000${mediaUrl}`} // Add full URL for media
                        alt={`Post Media ${index}`}
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                          marginTop: "15px",
                        }}
                      />
                    );
                  } else if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg") {
                    return (
                      <video
                        key={index}
                        controls
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          marginTop: "15px",
                        }}
                      >
                        <source src={`http://localhost:5000${mediaUrl}`} type={`video/${fileExtension}`} />
                        Your browser does not support the video tag.
                      </video>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
