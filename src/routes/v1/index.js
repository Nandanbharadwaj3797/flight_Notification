const express = require('express');

const{infoController, EmailController}= require('../../controllers');

const router = express.Router();

router.get('/info',infoController.info);
router.post('/tickets',EmailController.create);

module.exports = router;