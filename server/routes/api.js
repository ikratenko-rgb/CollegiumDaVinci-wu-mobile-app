const express = require('express');
const wuController = require('../controllers/wu');

const router = express.Router();

router.post('/login', wuController.login);
router.post('/schedule', wuController.schedule);
router.post('/class-details', wuController.classDetails);

module.exports = router;
