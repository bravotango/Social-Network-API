const User = require('../models/User');

module.exports = {
  getUsers(req, res, next) {
    User.find()
      .populate('thoughts')
      .then((users) => res.json(users))
      .catch((err) => next(err));
  },

  getSingleUser(req, res, next) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id' })
          : res.json(user)
      )
      .catch((err) => next(err));
  },

  createUser(req, res, next) {
    User.create(req.body)
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => next(err));
  },

  editUser(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      returnDocument: 'after',
    })
      .then((dbUpdatedUser) => res.status(200).json(dbUpdatedUser))
      .catch((err) => next(err));
  },

  deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params.userId })
      .then((dbDeleteResult) =>
        !dbDeleteResult
          ? res.status(404).json({ message: 'No user with that id' })
          : res.status(200).json(dbDeleteResult)
      )
      .catch((err) => next(err));
  },
};
