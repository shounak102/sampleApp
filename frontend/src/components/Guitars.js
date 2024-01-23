import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListItem from './ListItem';

class Items extends Component {
	state = {
		items: [],
	};

	componentDidMount() {
		this.getItems();
	}

	getItems = () => {
		axios
			.get('/api/items/get')
			.then((res) => {
				if (res.data) {
					this.setState({
						items: res.data,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	deleteItem = (id) => {
		axios
			.delete(`/api/items/delete/${id}`)
			.then((res) => {
				if (res.data) {
					this.getItems();
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		let { items } = this.state;
		return (
			<div>
				<h1>Shounak's Guitar Store</h1>
				<Input getItems={this.getItems} />
				<ListItem items={items} deleteItem={this.deleteItem} />
			</div>
		);
	}
}

export default Items;
