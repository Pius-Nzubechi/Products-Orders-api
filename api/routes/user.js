const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


router.post('/info', userCtrl.userInfo);
router.get('/', userCtrl.getAllUsers);



module.exports = router;