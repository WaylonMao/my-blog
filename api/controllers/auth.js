import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  // Check if the user already exists
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?';
  db.query(q, [req.body.email, req.body.username], (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result.length > 0) {
      return res.status(409).json('User already exists');
    }
    // Hash the password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const q =
      'INSERT INTO users (`username`, `email`, `password`) VALUES (?,?,?)';

    db.query(q, [req.body.username, req.body.email, hash], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.status(201).json('User created');
    });
  });
};

export const login = (req, res) => {
  // Check if the user exists
  const q = 'SELECT * FROM users WHERE username = ?';
  db.query(q, [req.body.username], (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result.length === 0) {
      return res.status(404).json('User not found!');
    }
    // Check if the password is correct
    const user = result[0];
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json('Incorrect username or password!');
    }
    // Create a token
    const token = jwt.sign({ id: result[0].id }, 'jwtkey');
    const { password, ...other } = result[0];
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
