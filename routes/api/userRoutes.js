const router = require('express').Router();
const {
  createUser,
  deleteUser,
  editUser,
  addFriend,
  deleteFriend,
  getSingleUser,
  getUsers,
} = require('../../controllers/userController.js');

router.route('/').post(createUser).get(getUsers);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(editUser);

router.route('/:userId/:friendId').put(addFriend).delete(deleteFriend);

module.exports = router;
