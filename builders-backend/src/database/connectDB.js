const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = {
  connectDB: async () => {
    try {
      await mongoose.connect(DB_URL);
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  },
};
