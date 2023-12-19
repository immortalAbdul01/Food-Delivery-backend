// controllers/authController.js - User authentication logic

const User = require('../models/user');
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { hashPassword, comparePasswords } = require('../utils/password_utils');
const { error } = require('console');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }



    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
	  user: process.env.gmail,
    pass: process.env.gmailpassword,
  },
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token and save it to the user's document
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    // Send email with the reset token
    const mailOptions = {
      from: process.env.gmail,
      to: email,
      subject: 'Password Reset',
      text: `Your password reset token is: ${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ message: 'Error sending password reset email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Password reset token sent to your email' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      console.log('Invalid or expired token:', token);
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the password and clear the reset token fields
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    console.log('Password reset successful for user:', user.email);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    console.log('Reset password token:', token); // Log the reset password token
    res.status(500).json({ message: error.message });
  }
};


module.exports = { signup, login, forgotPassword, resetPassword };
