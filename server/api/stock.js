const router = require('express').Router();
const Stock = require('../models/Stock');


// Get all stock
router.get('/', async (req, res) => {
    let stock = await Stock.find({})
    res.send(stock);
});

// Save a stock to db
router.post('/', async (req, res) => {
    const { name, quantity, numberInStock } = req.body;
    let stock = new Stock({
        name,
        quantity,
        numberInStock
    })
    await stock.save()
    return res.send(stock);
});

// Edit stock
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity, numberInStock } = req.body;
    const stock = await Stock.findByIdAndUpdate(id, {
        quantity, numberInStock
    });
    if (stock) return res.send(stock)
});


module.exports = router;