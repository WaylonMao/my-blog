import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// const posts = [
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   },
//   {
//     id: 2,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   },
//   {
//     id: 3,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   },
//   {
//     id: 4,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   },
// ];

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);

  const abstractFn = (text) => {
    if (!text) {
      return '';
    } else {
      let str = text
        .replace(/(\*\*|__)(.*?)(\*\*|__)/g, '')
        .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g, '')
        .replace(/\([\s\S]*?\)/g, '')
        .replace(/<\/?.+?\/?>/g, '')
        .replace(/(\*)(.*?)(\*)/g, '')
        .replace(/`{1,2}[^`](.*?)`{1,2}/g, '')
        .replace(/```([\s\S]*?)```[\s]*/g, '')
        .replace(/\~\~(.*?)\~\~/g, '')
        .replace(/[\s]*[-\*\+]+(.*)/g, '')
        .replace(/[\s]*[0-9]+\.(.*)/g, '')
        .replace(/(#+)(.*)/g, '')
        .replace(/(>+)(.*)/g, '')
        .replace(/\r\n/g, '')
        .replace(/\n/g, '');
      return str.slice(0, 180);
    }
  };

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
              <img src={`../upload/${post?.img}`} alt='' />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{abstractFn(post.desc)}...</p>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
