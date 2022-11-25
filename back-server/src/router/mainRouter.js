const {register, login, auction, addItem, singleItem, updateBid,} = require('../controller/mainController');
const { validateRegistration } = require('../middleware/validator');
const express = require('express');
const router = express.Router();


router.post('/register', validateRegistration, register);
router.post('/login', login);
router.get('/auction', auction);
router.post('/addItem', addItem);
router.post('/updateBid', updateBid);
router.get('/singleItem/:id', singleItem);

module.exports = router;
