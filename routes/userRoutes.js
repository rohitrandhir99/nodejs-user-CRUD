const express = require('express');

// controllers
const controller = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(controller.createNewUser).get(controller.getAllUsers);

router
  .route('/:id')
  .get(controller.getUserWrtId)
  .put(controller.updateUsersWrtID)
  .delete(controller.deleteUserWrtId);

module.exports = router;
