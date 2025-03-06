const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock admin user (replace with real user storage)
const adminUser = {
  email: 'admin@example.com',
  password: bcrypt.hashSync('admin123', 10)
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (email !== adminUser.email) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, adminUser.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;