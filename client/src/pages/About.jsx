import React from 'react';
import Menu from '../components/Menu';
import {
  SiJava,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiOracle,
  SiSpringboot,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiArduino,
  SiGithub,
  SiLinkedin,
} from 'react-icons/si';
import { GrServerCluster } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';

const About = () => {
  return (
    <div className='single'>
      <div className='content'>
        <h1>About Me</h1>
        <p>👋Hi there! </p>
        <p>
          My name is <b>Weilong Mao</b>&nbsp;and I'm a software development
          student at{' '}
          <a href='https://www.sait.ca/'>
            <img
              className='icon'
              src='https://www.sait.ca/assets/images/events/ev-sait-logo-500x500.jpeg'
              alt='SAIT'
            />
            the Southern Alberta Institute of Technology
          </a>
          &nbsp;with a passion for technology and problem-solving. I'm
          proficient in a variety of technologies, including
          <SiJava />
          Java,&nbsp;
          <SiJavascript />
          JavaScript,&nbsp;
          <SiHtml5 />
          HTML,&nbsp;
          <SiCss3 />
          CSS,&nbsp;
          <SiOracle />
          Oracle PL/SQL,&nbsp;
          <SiSpringboot />
          Spring Boot,&nbsp;
          <SiMongodb />
          MongoDB,&nbsp;
          <SiReact />
          React.js,&nbsp;
          <SiNodedotjs />
          Node.js,&nbsp;
          <SiExpress />
          Express.js,&nbsp;
          <GrServerCluster />
          server installation and maintenance, and&nbsp;
          <SiArduino />
          Arduino.
        </p>
        <p>
          As a quick learner with a strong work ethic, I'm excited to bring my
          skills and enthusiasm to a new opportunity in software development. If
          you're looking for a hard-working and dedicated software developer,
          please feel free to connect with me. I'd love to chat and see how we
          can collaborate!
        </p>
        <p>
          Here are my Linkedin:&nbsp;&nbsp;
          <a
            className='linkedin'
            href='https://www.linkedin.com/in/weilong-mao/'>
            <SiLinkedin />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;and Github:&nbsp;&nbsp;
          <a className='github' href='https://github.com/waylonmao'>
            <SiGithub />
          </a>
        </p>
        <p>
          <a href='mailto:weilong.mao@edu.sait.ca'>
            <AiOutlineMail className='github' />
            weilong.mao@edu.sait.ca
          </a>
        </p>
        <p></p>
      </div>
      <Menu cat='project' />
    </div>
  );
};
export default About;
