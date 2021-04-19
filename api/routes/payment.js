const express = require('express');
const router = express.Router();


const paymentCtrl = require('../controllers/payment');



router.post('/', paymentCtrl.paymentNin);





module.exports = router;