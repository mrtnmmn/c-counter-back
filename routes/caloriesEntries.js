const express = require('express');
const CaloriesEntry = require('../models/CaloriesEntry');
const authMiddleware = require('../middlewares/authMiddleware');
const { formatResponse, formatErrorResponse } = require('../utils/responseFormatter');

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const entries = await CaloriesEntry.find({ user: userId });

    const sum = entries.reduce((accumulator, entry) => {
      return accumulator + entry.calories;
    }, 0);

    res.status(200).json(formatResponse(entries, { count: entries.length, caloriesSum: sum }));
  } catch (err) {
    res.status(500).json(formatErrorResponse('Server error'));
  }
});

router.get('/today', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const entries = await CaloriesEntry.find({
      user: userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!entries.length) {
      return res.status(404).json(formatErrorResponse('No entries found for today'))
    }

    const sum = entries.reduce((accumulator, entry) => {
      return accumulator + entry.calories
    }, 0)

    res.status(200).json(formatResponse(entries, {count: entries.length, caloriesSum: sum}))
  } catch (err) {
    res.status(500).json(formatErrorResponse('Server error'));
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { calories } = req.body;

  try {
    const userId = req.user.id;

    const newEntry = new CaloriesEntry({
      user: userId,
      calories
    });

    await newEntry.save();

    res.status(201).json(formatResponse(newEntry, null, 'Entry created successfully'));
  } catch (err) {
    res.status(500).json(formatErrorResponse('Server error'));
  }
});

module.exports = router;
