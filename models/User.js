const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  // Array of _id values referencing the Thought model
  thoughts: { type: [Number], required: true, unique: true, trim: true },
  // Array of _id values referencing the User model (self-reference)
  friends: { type: [Number], required: true, unique: true, trim: true },
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User.create(
  {
    username: 'bt',
    email: 'bt@home.com',
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = User;
