const express = require('express');
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { formatErrorResponse, formatResponse } = require('../utils/responseFormatter')

const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json(formatErrorResponse('Invalid credentials'))
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json(formatErrorResponse('Invalid credentials'))
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET)

    res.json(formatResponse({ token }))
  } catch (error) {
    console.error(error)
    res.status(500).json(formatErrorResponse(`Server error: ${error}`))
  }
});

module.exports = router