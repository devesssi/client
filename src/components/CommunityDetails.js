// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";

// const CommunityDetailsPage = () => {
//   const { id } = useParams(); // Get community ID from URL
//   const [community, setCommunity] = useState(null);
//   const [posts, setPosts] = useState([]); // Store posts
//   const [newPost, setNewPost] = useState({ title: "", content: "" });
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCommunityDetails = async () => {
//       try {
//         console.log(`Fetching details for community ID: ${id}`);
//         const res = await axios.get(`http://localhost:5000/api/communities/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setCommunity(res.data.community);
//         setPosts(res.data.posts); // Set posts
//       } catch (err) {
//         console.error("Error fetching community details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchCommunityDetails();
//   }, [id, token]);

//   const handlePostSubmit = async () => {
//     if (!newPost.title || !newPost.content) {
//       alert("Title and content cannot be empty.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/posts",
//         { communityId: id, title: newPost.title, content: newPost.content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setPosts([...posts, res.data]); // Add new post to list
//       setNewPost({ title: "", content: "" }); // Reset input fields
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   if (loading) return <h2>Loading Community Details...</h2>;
//   if (!community) return <h2>Community Not Found</h2>;

//   return (
//     <div style={{ padding: "20px" }}>

//       <h1>{community.name}</h1>
//       <p>{community.description}</p>
//       <h3>Members: {community.members.length}</h3>

//       {/* Create New Post Form */}
//       <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd" }}>
//         <h3>Create a New Post</h3>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newPost.title}
//           onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//           style={{ display: "block", width: "100%", marginBottom: "10px", padding: "5px" }}
//         />
//         <textarea
//           placeholder="Write your post..."
//           value={newPost.content}
//           onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//           style={{ display: "block", width: "100%", height: "100px", marginBottom: "10px", padding: "5px" }}
//         />
//         <button onClick={handlePostSubmit} style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff" }}>
//           Post
//         </button>
//       </div>

//       <h2>Community Posts</h2>
//       {posts.length === 0 ? (
//         <p>No posts in this community yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <small>Posted by: {post.user?.name || "Unknown"}</small>
//             <div style={{ marginTop: "10px" }}>
//               <button style={{ marginRight: "10px" }}>👍 Like</button>
//               <button>💬 Comment</button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CommunityDetailsPage;


//this is a duplicate of the another file so it is commented
