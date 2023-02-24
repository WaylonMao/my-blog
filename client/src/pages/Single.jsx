import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import MDEditor from '@uiw/react-md-editor';

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate('/');
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='single'>
      <div className='content' data-color-mode='light'>
        <img src={`../upload/${post?.img}`} alt='' />
        <div className='user'>
          {post.userImg && <img src={`../upload/${post.userImg}`} alt='' />}
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className='edit'>
              <Link to={`/write?edit=${postId}`}>
                <img src={Edit} alt='' />
              </Link>
              <img onClick={handleDelete} src={Delete} alt='' />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <MDEditor.Markdown
          source={post.desc}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
