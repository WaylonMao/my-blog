import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');

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

  return (
    <div className='profile'>
      <div className='container'>
        <h1>Profile Id:{id}</h1>
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
        <button>Save</button>
        <img src={`../upload/${img}`} alt='img' />
      </div>
    </div>
  );
};
export default Profile;