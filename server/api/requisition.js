const router = require('express').Router();
const Requisition = require('../models/Requisition');


// Get all requisition
router.get('/', async (req, res) => {
    let requisition = await Requisition.find({}).sort('returnDate');
    res.send(requisition)
});

// Save requisition to db
router.post('/', async (req, res) => {
    const { name, role, item, returnDate } = req.body;
    let requisition = new Requisition({
        name,
        role,
        item,
        returnDate
    });
    await requisition.save()
    return res.send(requisition);
});

// Delete requisition
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const requisition = await Requisition.findByIdAndDelete(id);
    if (requisition) return res.send(requisition);
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