const express = require('express');
const router = express.Router();


const linkCtrl = require('../controllers/link');



router.post('/', linkCtrl.linkNin);
router.get('/', linkCtrl.allLinkedNin);




module.exports = router;