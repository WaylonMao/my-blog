import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);

  const handleClick = (id) => () => {
    window.location.href = `/post/${id}`;
  };

  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img src={`../upload/${post.img}`} alt='' />
          <h2>{post.title}</h2>
          <button onClick={handleClick(post.id)}>Read More</button>
        </div>
      ))}
    </div>
  );
};
export default Menu;
