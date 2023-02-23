import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import MDEditor from '@uiw/react-md-editor';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

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
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add'>
      <div className='content'>
        <input
          type='text'
          placeholder='Title'
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
              checked={cat === 'prpject'}
              name='cat'
              value='prpject'
              id='prpject'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='prpject'>Prpject</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
