import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import MDEditor from '@uiw/react-md-editor';

const Write = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState('');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      console.log(res.data.file.filename);
      return res.data.file.filename;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      if (location.search.startsWith('?edit=')) {
        const postId = location.search.substring(6);
        await axios.put(`/posts/${postId}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
        });
      } else {
        await axios.post(`/posts/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (location.search.startsWith('?edit=')) {
        const postId = location.search.substring(6);
        const response = await axios.get(`/posts/${postId}`);
        const { title, desc, cat, img } = response.data;
        setTitle(title);
        setValue(desc);
        setCat(cat);
        setFile(img);
      }
    }
    fetchData();
  }, [location.search]);

  return (
    <div className='add'>
      <div className='content'>
        <input
          name='title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div data-color-mode='light'>
          <MDEditor className='editor' value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: 'none' }}
            type='file'
            id='file'
            name=''
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className='file' htmlFor='file'>
            Upload Image
          </label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'article'}
              name='cat'
              value='article'
              id='article'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='article'>Article</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'project'}
              name='cat'
              value='project'
              id='project'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='project'>Prpject</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
