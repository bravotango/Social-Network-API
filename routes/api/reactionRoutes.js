const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController.js');

router.route('/:thoughtId').post(createReaction);

router.route('/:reactionId').delete(deleteReaction);

module.exports = router;
