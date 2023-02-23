import React from 'react';
import Logo from '../img/logo.png';
import { SiGithub, SiReact } from 'react-icons/si';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt='' />
      <span>
        By&nbsp;
        <a className='github' href='https://github.com/waylonmao'>
          <SiGithub />
          Weilong Mao
        </a>{' '}
        - Made with{' '}
        <a href='https://reactjs.org/'>
          <SiReact />
          <b>React.js</b>
        </a>
      </span>
    </footer>
  );
};

export default Footer;
