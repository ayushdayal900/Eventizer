// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userSignupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  agreeTerms: Boolean,
});
const User = mongoose.model('User', UserSchema);

// POST route
app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
