const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create schema for todo
const ItemSchema = new Schema({
	title: {
		type: String,
		required: [true, 'The item title field is required'],
	},
	img: {
		type: String,
		required: [true, 'The item image field is required'],
	},
	price: {
		type: Number,
		required: [true, 'The item price field is required'],
	},
	desc: {
		type: String,
		required: [true, 'The item description field is required'],
	},
});

// Create model for todo
const Item = mongoose.model('item', ItemSchema);

module.exports = Item;
