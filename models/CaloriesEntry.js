const mongoose = require('mongoose');

const caloriesEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
    }
});

const CaloriesEntry = mongoose.model('CaloriesEntry', caloriesEntrySchema);
module.exports = CaloriesEntry;
