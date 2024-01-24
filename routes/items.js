const express = require('express');
const router  = express.Router();
const items   = require('../controllers/items');

router.get('/get',              items.getItems);
router.post('/create',          items.createItem);
router.post('/edit/:id',        items.editItem);
router.delete('/delete/:id',    items.deleteItem);

module.exports = router;
