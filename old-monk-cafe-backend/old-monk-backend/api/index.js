const app = require('../app');
const connectDB = require('../config/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Serverless entry handler error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};
