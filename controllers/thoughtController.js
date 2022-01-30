const thought = require('../models/Thought');
const user = require('../models/User');

module.exports = {
  createThought(req, res, next) {
    thought
      .create(req.body)
      .then((thought) => {
        return user.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => next(err));
  },
  getThoughts(req, res, next) {
    thought
      .find()
      .populate('reactions')
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => next(err));
  },
  getSingleThought(req, res, next) {
    thought
      .findOne({ _id: req.params.thoughtId })
      .populate('reactions')
      .then((dbThoughtData) => res.status(200).json(dbThoughtData))
      .catch((err) => next(err));
  },
  editThought(req, res, next) {
    thought
      .findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
        returnDocument: 'after',
      })
      .then((dbThoughtData) => res.status(200).json(dbThoughtData))
      .catch((err) => next(err));
  },
  deleteThought(req, res, next) {
    thought
      .deleteOne({ _id: req.params.thoughtId })
      .then((dbDeleteThoughtResponse) => {
        res.status(200).json(dbDeleteThoughtResponse);
      })
      .catch((err) => next(err));
  },
};
