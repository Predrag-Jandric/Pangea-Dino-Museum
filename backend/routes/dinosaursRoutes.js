const express = require('express');
const { getAllDinosaurs } = require('../controllers/dinosaursController');
const router = express.Router();

router.get('/', getAllDinosaurs);

module.exports = router;