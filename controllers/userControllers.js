// user model
const User = require('../models/userModel');

// create a new user (C)
exports.createNewUser = async (req, res) => {
  //console.log(req.body)

  // user parameters
  const { name, email, password } = req.body;

  // check if all these 3 fields are present
  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Name, email and password are required!',
    });
  }

  try {
    // check if the user's email already exists
    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      return res.status(400).json({
        status: 'failed',
        message: 'This email already exists! Try another one.',
      });
    }

    // using the user model for user data
    const user = new User({ name, email, password });
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User created successfully!',
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// read
// get all users (R)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Cant fetch user information at this time. Try again later!',
    });
  }
};

// get user wrt id  (R)
exports.getUserWrtId = async (req, res) => {
  try {
    //console.log(req.body);
    //console.log(req.params)

    const user = await User.findById(req.params.id);

    // if user does not exist
    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'User not found!' });
    }

    // if user exists
    res.status(200).json({
      status: 'ok',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'User not found!',
    });
  }
};

// update user wrt id  (U)
// here we can update either name, email or password or
// all the three fields together
exports.updateUsersWrtID = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'User not found!' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(201).json({
      status: 'success',
      message: 'User updated successfully.',
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: "Can't update the user!",
    });
  }
};

// delete user wrt id  (D)
exports.deleteUserWrtId = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // if user doesnot exists
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found!',
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'User was deleted successfully!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: "Can't delete the user!",
    });
  }
};
