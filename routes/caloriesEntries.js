const express = require('express');
const CaloriesEntry = require('../models/CaloriesEntry');
const authMiddleware = require('../middlewares/authMiddleware'); // 

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId)

    const entries = await CaloriesEntry.find({ user: userId });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/today', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    console.log(startOfDay)

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    console.log(endOfDay)

    const entries = await CaloriesEntry.find({
      user: userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!entries.length) {
      return res.status(404).json({ message: 'No entries found for today' });
    }

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  const { calories } = req.body;

  try {
    const userId = req.user.id;

    console.log(calories, userId)

    const newEntry = new CaloriesEntry({
      user: userId,
      calories
    });

    await newEntry.save();

    res.status(201).json({ message: 'Entry created successfully', entry: newEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err});
  }
});

module.exports = router;
