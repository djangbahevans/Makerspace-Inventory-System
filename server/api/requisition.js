const router = require('express').Router();
const Requisition = require('../models/Requisition');
const Stock = require('../models/Stock');


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
        // TODO: reduce stock numberInStock if requisition goes through
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
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { role, item, returnDate } = req.body;
    const requisition = await Requisition.findByIdAndUpdate(id, {
        role, item, returnDate
    });
    if (requisition) return res.send(requisition);
});

module.exports = router;