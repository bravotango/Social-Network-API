const router = require('express').Router();
const {
  createThought,
  deleteThought,
  editThought,
  getThoughts,
  getSingleThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(editThought)
  .delete(deleteThought);

router.route('/:userId').post(createThought);

module.exports = router;
