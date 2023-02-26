import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/about'>
            <h6>About Me</h6>
          </Link>
          <Link className='link' to='/?cat=article'>
            <h6>Articles</h6>
          </Link>
          <Link className='link' to='/?cat=project'>
            <h6>Projects</h6>
          </Link>
          <Link className='link' to='/profile'>
            <span>{currentUser?.username}</span>
          </Link>
          {currentUser ? (
            <>
              <span onClick={logout}>Logout</span>
              <span className='write'>
                <Link className='link' to='/write'>
                  Write
                </Link>
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
