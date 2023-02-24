import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem('user')).id;
        setId(id);
        const res = await axios.get(`/users/${id}`);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImg(res.data.img);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const updateUsername = async () => {
    try {
      const res = await axios.put(`/users/${id}`, { username });
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmail = async () => {
    try {
      const res = await axios.put(`/users/${id}`, { email });
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const updatePassword = async () => {
    try {
      const res = await axios.put(`/users/${id}`, { password });
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const previewImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const replaceImg = async () => {
    const formData = new FormData();
    formData.append('file', imgFile);
    try {
      const resImg = await axios.post(`/upload`, formData);
      console.log(resImg.data.file.filename);
      setImg(resImg.data.file.filename);
      setImgPreview(null);
      const res = await axios.put(`/users/${id}`, {
        img: resImg.data.file.filename,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <form action=''>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleInput}
        />
        <button onClick={updateUsername}>Save</button>
        <label htmlFor='email'>Email: </label>
        <input type='text' name='email' value={email} onChange={handleInput} />
        <button onClick={updateEmail}>Save</button>
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleInput}
        />
        <button onClick={updatePassword}>Save</button>
        <img src={`../upload/${img}`} alt='img' />
        <input type='file' name='img' onChange={previewImg} />
        {imgPreview ? (
          <>
            <img src={imgPreview} alt='Preview' />
            <button onClick={replaceImg}>Save</button>
          </>
        ) : (
          <p>No image selected</p>
        )}
      </form>
    </div>
  );
};
export default Profile;
