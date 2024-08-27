const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/add', cityController.addCity);
router.put('/update/:id', cityController.updateCity);
router.delete('/delete/:id', cityController.deleteCity);
router.get('/list', cityController.getCities);

module.exports = router;
