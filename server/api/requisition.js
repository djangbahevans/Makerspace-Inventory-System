const router = require('express').Router();
const Requisition = require('../models/Requisition');
const Stock = require('../models/Stock');
const authorize = require('../auth/authorize');


router.use(authorize);

// Get all requisition
router.get('/', async (req, res) => {
    let requisitions = await Requisition.find({}).sort('returnDate').populate('item');
    let requ = requisitions.map(requisition => {
        let newReq = {
            _id: requisition._id,
            name: requisition.name,
            item: requisition.item.name,
            role: requisition.role,
            returnDate: requisition.returnDate
        }
        return newReq
    });
    res.send(requ)
});

// Save requisition to db
router.post('/', async (req, res) => {
    const { name, role, item, returnDate } = req.body;
    const stock = await Stock.findOne({ name: item }); // Ensure item exists
    if (stock) {
        let { numberInStock } = stock;
        if (!numberInStock) return res.send({ error: 'The specified item is not in stock' });
        stock.numberInStock = --numberInStock;
        let requisition = new Requisition({
            name,
            role,
            item: stock,
            returnDate
        });
        requisition = await requisition.save();
        await stock.save();
        const req = {
            ...requisition._doc,
            item: stock.name
        }
        return res.send({ requisition: req, stock });
    }
    return res.send({ error: 'The specified item does not exist' });
});

// Delete requisition
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const requisition = await Requisition.findByIdAndDelete(id);
    let stock = await Stock.findById(requisition.item);

    ++stock.numberInStock; // Increase Stock numberInStock Count

    // Add requisition to Stock requisitionHistory
    const { _id, item, ...requisitionHistory } = requisition._doc;
    requisitionHistory.actualReturnDate = new Date();
    stock.requisitionHistory.push(requisitionHistory);

    await stock.save();
    if (requisition) return res.send(stock);
});

// Edit requisition
// TODO: Doesn't work properly
// Find former item, increment count, find new item, decrement count, update requisition with new item
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { role, item, returnDate } = req.body;
    let requisition = await Requisition.findById(id);

    // Increment former item
    let oldStock = await Stock.findById(requisition.item._id)
    ++oldStock.numberInStock
    oldStock.save();

    // Decrement current item
    let newStock = await Stock.findOne({ name: item })
    --newStock.numberInStock
    await newStock.save();

    // Editing requisition
    requisition.item = newStock;
    requisition.role = role
    requisition.returnDate = returnDate
    requisition.save()

    return res.send({ requisition, oldStock, newStock });
});

module.exports = router;