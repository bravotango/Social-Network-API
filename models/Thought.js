const { longDate } = require('../utils');
const mongoose = require('mongoose');
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      get: longDate,
    },
    username: { type: String, required: true },
    reactions: [{ type: mongoose.Schema.ObjectId, ref: 'Reaction' }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
