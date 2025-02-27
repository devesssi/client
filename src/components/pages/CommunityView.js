import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../PostForm";
import PostList from "../PostList";

const CommunityView = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setError(null);
        const res = await axios.get(`http://localhost:5000/api/communities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("✅ Community API Response:", res.data);
        setCommunity(res.data.community);
  
        // Check if user is a member
        const memberIds = res.data.community.members.map((member) => member._id);
        setIsMember(memberIds.includes(userId));
      } catch (error) {
        console.error("❌ Error fetching community:", error);
        setError("Failed to fetch community.");
      }
    };
  
    const fetchPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/posts/community/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          console.log("✅ Posts API Response:", res.data);
          
          setPosts([...res.data.posts]); // ✅ Force a re-render by creating a new array reference
        } catch (error) {
          console.error("❌ Error fetching posts:", error);
          setError("Failed to fetch posts.");
        }
      };
      
  
    const fetchData = async () => {
      setLoading(true);
      await fetchCommunity();
      await fetchPosts();
      setLoading(false); // ✅ Now ensures both API calls complete before stopping loading
    };
  
    fetchData();
  }, [id, token, userId]);
  
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : community ? (
        <>
          <h1>📌 {community.name}</h1>
          <p>{community.description}</p>

          <h3>👥 Members:</h3>
          <ul>
            {community.members.length > 0 ? (
              community.members.map((member) => (
                <li key={member._id}>
                  {member.name} ({member.email})
                </li>
              ))
            ) : (
              <p>No members yet.</p>
            )}
          </ul>

          {isMember && (
            <>
              <h3>📝 Create a Post:</h3>
              <PostForm communityId={id} />

              <h3>📜 Posts:</h3>
              {posts.length > 0 ? <PostList communityId={id} /> : <p>No posts yet.</p>}
            </>
          )}
        </>
      ) : (
        <p>Community not found.</p>
      )}
    </div>
  );
};

export default CommunityView;
