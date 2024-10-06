const express = require('express')
const User = require('../models/User')
const { formatErrorResponse, formatResponse } = require('../utils/responseFormatter')
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    let user = await User.findOne({ username })
    if (user) {
      return res.status(400).json(formatErrorResponse('User already exists'))
    }

    user = new User({
      username,
      password
    })

    await user.save()

    res.status(201).json(formatResponse(null, null, 'User registered successfully'))
  } catch (error) {
    console.error(error)
    res.status(500).json(formatErrorResponse('Server error'))
  }
});

module.exports = router;
