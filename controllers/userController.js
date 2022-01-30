const user = require('../models/User');
const thought = require('../models/Thought');

module.exports = {
  getUsers(req, res, next) {
    user
      .find()
      .populate('thoughts')
      .then((users) => res.json(users))
      .catch((err) => next(err));
  },
  getSingleUser(req, res, next) {
    user
      .findOne({ _id: req.params.userId })
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id' })
          : res.json(user)
      )
      .catch((err) => next(err));
  },
  createUser(req, res, next) {
    user
      .create(req.body)
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => next(err));
  },
  editUser(req, res, next) {
    user
      .findOneAndUpdate({ _id: req.params.userId }, req.body, {
        returnDocument: 'after',
      })
      .then((dbUpdatedUser) => res.status(200).json(dbUpdatedUser))
      .catch((err) => next(err));
  },
  deleteUser(req, res, next) {
    user.findOne({ _id: req.params.userId }).then((foundUser) => {
      return thought.deleteMany({ username: foundUser.username });
    });
    user
      .deleteOne({ _id: req.params.userId })
      .then((dbDeleteResult) =>
        !dbDeleteResult
          ? res.status(404).json({ message: 'No user with that id' })
          : res.status(200).json(dbDeleteResult)
      )
      .catch((err) => next(err));
  },
  addFriend(req, res, next) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { returnDocument: 'after' }
      )
      .then((dbUpdatedUser) => {
        res.status(200).json(dbUpdatedUser);
      })
      .catch((err) => next(err));
  },
  deleteFriend(req, res, next) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { returnDocument: 'after' }
      )
      .then((dbUpdatedUser) => {
        res.status(200).json(dbUpdatedUser);
      })
      .catch((err) => next(err));
  },
};
