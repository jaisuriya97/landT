const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: String,
});

const User = mongoose.model('User', userSchema);
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: 'Email already exists. Please use a different email address.' });
  }
  const OTP = generateOTP();
  const user = new User({
    name,
    email,
    password: password,
  });

  function generateOTP() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      otp += randomNumber.toString();
    }
    return otp;
  }

  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jaisuriya200297@gmail.com',
      pass: 'lzyc okhw kwic dezh',
    },
  });

  const mailOptions = {
    from: 'jaisuriya200297@gmail.com',
    to: email,
    subject: 'Verify your account',
    text: `Your OTP is ${OTP}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Verification email sent: ${info.response}`);
    }
  });

  res.status(201).send({ message: OTP });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found. Please register first.' });
    }
    if (user.password !== password) {
      return res.status(401).send({ message: 'Invalid password.' });
    }
    res.status(200).send({
      message: 'Login successful.',
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
