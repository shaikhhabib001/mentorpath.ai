const User = require('../models/User');
const { createSendToken, asyncHandler } = require('../utils/helpers');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, profession } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    profession
  });

  createSendToken(newUser, 201, res);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect email or password'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    });
  }

  // Update last login
  await user.updateLastLogin();

  createSendToken(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, profession, preferences } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      profession,
      preferences: { ...req.user.preferences, ...preferences }
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});