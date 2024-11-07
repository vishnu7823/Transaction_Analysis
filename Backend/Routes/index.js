const express = require('express');
const { initializeDatabase, listProducts, getStatistics, getBarChart, getPieChart, getCombinedData } = require('../Controller/Controller');
const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/products', listProducts);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;
