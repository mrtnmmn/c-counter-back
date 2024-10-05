const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
