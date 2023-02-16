export const getUserById = async (req, res) => {
  const q = 'SELECT * FROM users WHERE id = ?';
  const user = await db.query(q, [req.params.id]);
  if (user.length === 0) return res.status(404).json('User not found!');
  return res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const qUser = 'SELECT * FROM users WHERE id = ?';
  const user = await db.query(qUser, [req.params.id]);
  if (user.length === 0) return res.status(404).json('User not found!');
  const values = [
    req.body.username,
    req.body.email,
    req.body.img,
    req.params.id,
  ];
  const q = 'UPDATE users SET `username`=?,`email`=?,`img`=? WHERE `id` = ?';
  await db.query(q, values);
  const updatedUser = await db.query(qUser, [req.params.id]);
  return res.status(200).json(updatedUser);
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
