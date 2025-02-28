import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../PostForm";
import PostList from "../PostList";
import Navbar from "../Navbar";

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
    <div style={styles.pageContainer} >
      <Navbar/>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : community ? (
        <>
          {/* <h1>📌 {community.name}</h1>
          <p>{community.description}</p> */}

          {/* <h3>👥 Members:</h3>
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
          </ul> */}

          {isMember && (
            <>
              {/* <h3>📝 Create a Post:</h3> */}
              <PostForm communityId={id} />

              <h3>📜 Posts:</h3>
              {posts.length > 0 ? <PostList communityId={id} /> : <p>No posts yet.</p>}
            </>
          )}
        </>
      ) : (
        <p>Community not found.</p>
      )}
      <footer className="footer" style={styles.footer}>
              <div className="footer-content" style={styles.footerContent}>
                <div className="footer-column"style={styles.footerColumn}>
                  <h4>For Students</h4>
                  <ul>
                    <li>
                      <a href="#communities">Communities</a>
                    </li>
                    <li>
                      <a href="#job-list">Job List</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-column" style={styles.footerColumn}>
                  <h4>For Professors</h4>
                  <ul>
                    <li>
                      <a href="#create-community">Create Community</a>
                    </li>
                    <li>
                      <a href="#manage-resources">Manage Resources</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-column" style={styles.footerColumn}>
                  <h4>For HR</h4>
                  <ul>
                    <li>
                      <a href="#post-job">Post Job</a>
                    </li>
                    <li>
                      <a href="#talent-pool">Talent Pool</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-column" style={styles.footerColumn}>
                  <h4>Support</h4>
                  <ul>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                  </ul>
                </div>
                <div className="footer-column" style={styles.footerColumn}>
                  <h4>Legal</h4>
                  <ul>
                    <li>
                      <a href="#privacy-policy">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#terms-of-service">Terms of Service</a>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="copyright">
                © 2025 Shri L.R. Tiwari College of Engineering. All rights reserved.
              </p>
            </footer>
    </div>
  );
};
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "115vh",
    // Ensures the page takes at least full screen height
  },
  footer: {
    backgroundColor: "transparent",
    color: "black",
    padding: "40px 60px",
    textAlign: "center",
    marginTop: "auto",
    borderTop: "1px solid #e0e0e0",
    
  },

  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  footerColumn: {
    marginBottom: "20px",
    textAlign: "left",
  },

  footerColumnTitle: {
    marginBottom: "10px",
    fontSize: "1.2em",
  },

  footerColumnList: {
    listStyleType: "none",
    padding: 0,
  },

  footerColumnItem: {
    margin: "5px 0",
  },

  footerColumnLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "1em",
  },

  footerColumnLinkHover: {
    textDecoration: "underline",
  },

  copyright: {
    marginTop: "20px",
    fontSize: "0.9em",
    width: "100%",
    textAlign: "center",
    color: "rgba(175, 173, 173, 0.6)",
  },
};

export default CommunityView;
