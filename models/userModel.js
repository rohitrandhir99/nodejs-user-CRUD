// user model structure
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// creating a user schema with different
// user properties like name, email, password, createdAt
// giving a collection name as 'userinfo'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// hash the password for security
// we use bcrypt for hashing since it increases the security
// nobody will know your original password

// save befire
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// collection name as 'userinfo'
const User = mongoose.model('userinfo', userSchema);

module.exports = User;
