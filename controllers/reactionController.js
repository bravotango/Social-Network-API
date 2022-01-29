const reaction = require('../models/Reaction');
const thought = require('../models/Thought');

module.exports = {
  createReaction(req, res, next) {
    reaction
      .create(req.body)
      .then((reaction) => {
        return thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => next(err));
  },

  deleteReaction(req, res, next) {
    reaction
      .deleteOne({ _id: req.params.reactionId })
      .then((dbDeleteResponse) => {
        res.status(200).json(dbDeleteResponse);
      })
      .catch((err) => next(err));
  },
};
