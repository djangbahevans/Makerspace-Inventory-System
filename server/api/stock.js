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
    console.log(id)
    const { name, quantity, numberInStock } = req.body;
    let stock = await Stock.findByIdAndUpdate(id, {
        name, quantity, numberInStock
    });
    if (stock) return res.send(stock)
});


module.exports = router;