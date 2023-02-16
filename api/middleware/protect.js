import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) return res.status(401).json('You are not authorized!');

  const decoded = jwt.verify(access_token, 'jwtkey');

  if (!decoded) return res.status(401).json('You are not authorized!');

  next();
};

export default protect;
