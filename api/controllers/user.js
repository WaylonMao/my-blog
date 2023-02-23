import { db } from '../db.js';

export const getUserById = async (req, res) => {
  const q = 'SELECT `username`,`email`, `img` FROM users WHERE id = ?';
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result[0]);
  });
};

export const updateUser = async (req, res) => {
  const qUser = 'SELECT `id`,`username`,`email`, `img` FROM users WHERE id = ?';
  await db.query(qUser, [req.params.id], (err, result) => {
    if (result.length === 0) return res.status(404).json('User not found!');

    let q = 'UPDATE users SET ';
    let values = [];

    // Add each specified field to the query and values array
    if (req.body.username) {
      q += '`username`=?,';
      values.push(req.body.username);
    }
    if (req.body.email) {
      q += '`email`=?,';
      values.push(req.body.email);
    }
    if (req.body.img) {
      q += '`img`=?,';
      values.push(req.body.img);
    }

    // Remove the last comma from the query string
    q = q.slice(0, -1);

    // Add the WHERE clause and the id value to the query and values array
    q += ' WHERE `id` = ?';
    values.push(req.params.id);

    // Execute the update query
    db.query(q, values);

    // Return the updated user object
    db.query(qUser, [req.params.id], (err, result) => {
      if (err) return res.json(err);
      return res.status(200).json(result[0]);
    });
  });
};

export const deleteUser = async (req, res) => {
  const qUser = 'SELECT * FROM users WHERE id = ?';
  const user = await db.query(qUser, [req.params.id]);
  if (user.length === 0) return res.status(404).json('User not found!');
  const q = 'DELETE FROM users WHERE id = ?';
  await db.query(q, [req.params.id]);
  const checkUser = await db.query(qUser, [req.params.id]);
  if (checkUser.length === 0) return res.status(200).json('User deleted!');
  return res.status(500).json('Something went wrong!');
};
