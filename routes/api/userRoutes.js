const router = require('express').Router();
const {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  getSingleUser,
} = require('../../controllers/userController.js');

router.route('/').post(createUser).get(getUsers);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(editUser);

module.exports = router;
