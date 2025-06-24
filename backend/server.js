const { exec } = require('child_process');
require('dotenv').config(); // Load .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/userSignupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(' MongoDB connection error:', err));

// ===== USER SCHEMA =====
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  agreeTerms: Boolean,
});
const User = mongoose.model('User', UserSchema);

// ===== EVENT SCHEMA =====
const EventSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  type: String,
  mode: String,
  category: String,
  startDate: String,
  endDate: String,
  language: String,
  posterPath: String,
  organizerName: String,
  organizerEmail: String,
  contactNumber: String,
  ticketType: String,
  attendeeLimit: String,
  registrationDeadline: String,
  venueName: String,
  venueAddress: String,
  googleMapLink: String,
  paymentMethod: String,
  beneficiaryName: String,
  accountNumber: String,
  bankName: String,
  ifsc: String,
  upiId: String,
  paypalEmail: String
});
const Event = mongoose.model('Event', EventSchema);

// ===== ROUTES =====
// Signup
const bcrypt = require('bcrypt');

// Signup (hash password)
app.post('/signup', async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...rest, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login (compare hash)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/events', upload.single('poster'), async (req, res) => {
  try {
    const {
      eventName, description, type, mode, category, startDate, endDate, language,
      organizerName, organizerEmail, contactNumber, ticketType, attendeeLimit,
      registrationDeadline, venueName, venueAddress, googleMapLink, paymentMethod,
      beneficiaryName, accountNumber, bankName, ifsc, upiId, paypalEmail
    } = req.body;

    const posterPath = req.file ? `/uploads/${req.file.filename}` : null;


    const newEvent = new Event({
      eventName, description, type, mode, category, startDate, endDate, language,
      organizerName, organizerEmail, contactNumber, ticketType, attendeeLimit,
      registrationDeadline, venueName, venueAddress, googleMapLink, paymentMethod,
      beneficiaryName, accountNumber, bankName, ifsc, upiId, paypalEmail,
      posterPath
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    console.error('Failed to create event:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});


// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find(); // Assuming Event is your Mongoose model
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error while fetching events' });
  }
});

// ===== START SERVER =====
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});













// app.use(cors());
// app.use(express.json());

// MailHog (localhost:1025) SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false, // No SSL
  auth: null     // No authentication for MailHog
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Express Email App!" });
});

// Email sending route
app.post('/send-email', async (req, res) => {
  const { recipient = "test@example.com", subject = "Hello from Express!", body = "This is a test email sent via MailHog." } = req.body;

  const mailOptions = {
    from: 'no-reply@eventizer.com',
    to: recipient,
    subject: subject,
    text: body
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:${PORT}");
});