const Item = require('../models/item');

class Controller {
	static getItems (req, res, next){
		// This will return all the data, exposing only the id and action field to the client
		Item.find({})
			.then((data) => res.json(data))
			.catch(next);
	}

	static createItem (req, res, next){
		if (req.body.title && req.body.img && req.body.price && req.body.desc) {
			Item.create(req.body)
				.then((data) => res.json(data))
				.catch(next);
		}
		else {
			res.json({
				error: 'one or more input fields are empty',
			});
		}
	}

	static editItem (req, res, next){
		if (req.params.id){
			Item.findOneAndUpdate ({ _id: req.params.id }, {
				title: req.body.title,
				price: req.body.price,
				img: req.body.img,
				desc: req.body.desc
			})
				.then((data) => res.json(data))
				.catch(next);
		}
		else {
			res.json ({
				error: 'item id required to edit',
			})
		}
	}

	static deleteItem (req, res, next){
		Item.findOneAndDelete({ _id: req.params.id })
			.then((data) => res.json(data))
			.catch(next);
	}
}

module.exports = Controller;
