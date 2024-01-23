import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {

	state = {
		title : '',
		price : '',
		desc  : '',
		img   : '',
	};

	addItem = () => {
		const item = {
			title : this.state.title,
			price : this.state.price,
			desc  : this.state.desc,
			img   : this.state.img,
		};

		/* Input validation */
		if (!item.title || item.title.length <= 0){
			console.log ('title field required');
			return;
		}
		if (!item.price || isNaN(item.price)){
			console.log ('price is required and must be a number');
			return;
		}
		if (!item.desc || item.desc.length <= 0){
			console.log ('description field required');
			return;
		}
		if (!item.img || item.img.length <= 0){
			console.log ('image url field required');
			return;
		}

		axios
			.post('/api/items/create', item)
		.then((res) => {
			if (res.data) {
				this.props.getItems();
				this.setState({
					title : '',
					desc  : '',
					price : '',
					img   : '',
				});
			}
		})
		.catch((err) => console.log(err));
	};

	handleTitleChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	};

	handlePriceChange = (e) => {
		this.setState({
			price: e.target.value,
		});
	};

	handleDescChange = (e) => {
		this.setState({
			desc: e.target.value,
		});
	};

	handleImgChange = (e) => {
		this.setState({
			img: e.target.value,
		});
	};

	render() {
    	let { title, desc, price, img } = this.state;
    	return (
			<div>
				<div className="inputContainer">
					<input type="text" onChange={this.handleTitleChange} value={title} placeholder="Enter Guitar Name"/>
					<input type="number" onChange={this.handlePriceChange} value={price} placeholder="Enter Price in Dollars"/>
					<input type="text" onChange={this.handleDescChange} value={desc} placeholder="Enter Description"/>
					<input type="text" onChange={this.handleImgChange} value={img} placeholder="Enter Image URL"/>
				</div>

				<button onClick={this.addItem}>Add Guitar</button>
			</div>
		);
	}
}

export default Input;
