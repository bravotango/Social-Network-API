const mongoose = require('mongoose');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email'],
    },
    // Array of _id values referencing the Thought model
    thoughts: [{ type: mongoose.Schema.ObjectId, ref: 'Thought' }],
    // Array of _id values referencing the User model (self-reference)
    friends: [{ type: [String], required: false, unique: true, trim: true }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
