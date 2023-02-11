import { db } from '../db.js';

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? 'SELECT * FROM posts WHERE cat = ?'
    : 'SELECT * FROM posts';
  db.query(q, [req.query.cat], (err, result) => {
    if (err) return res.json(err);

    return res.status(200).json(result);
  });
};

export const getPost = (req, res) => {
  const q =
    'SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?';
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.json(err);

    return res.status(200).json(result[0]);
  });
};

export const addPost = (req, res) => {
  return res.status(200).json('');
};

export const updatePost = (req, res) => {
  return res.status(200).json('');
};

export const deletePost = (req, res) => {
  return res.status(200).json('');
};
