import React, { Component } from 'react';
import axios                from 'axios';
import Button               from '@mui/material/Button';
import TextField            from '@mui/material/TextField';
import Dialog               from '@mui/material/Dialog';
import DialogActions        from '@mui/material/DialogActions';
import DialogContent        from '@mui/material/DialogContent';
import DialogTitle          from '@mui/material/DialogTitle';
import InputAdornment       from '@mui/material/InputAdornment';
import Stack                from '@mui/material/Stack';

class Input extends Component {

	state = {
		title : '',
		price : '',
		desc  : '',
		img   : '',
		openModal: false,
	};

	handleModalOpen = () => {
		this.setState({
			openModal: true,
		});
	}

	handleModalClose = (ev, reason) => {
		this.setState({
			openModal: false,
		})
	}

	addItem = (item) => {
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
    	return (
			<div>
				<Button onClick={this.handleModalOpen} variant="contained">Add Guitar</Button>

				<Dialog
					className="inputModal"
					fullWidth={true}
					maxWidth="lg"
					open={this.state.openModal}
					onClose={this.handleModalClose}
					PaperProps={{
						component: 'form',
						onSubmit: (event) => {
							event.preventDefault ();
							const formData = new FormData(event.currentTarget);
							const formJson = Object.fromEntries(formData.entries());

							const { title, price, desc, img } = formJson;
							console.log ({ title, price, desc, img});
							this.addItem ({ title, price, desc, img });
							this.handleModalClose ();
						},
					}}
				>
					<DialogTitle>Enter Guitar Details</DialogTitle>
					<DialogContent className="input-modal-content">
						<Stack spacing={2}>
							<TextField
								required
								id="title"
								name="title"
								label="Guitar Name"
								type="text"
								variant="outlined"
								placeholder="Guitar Name"
							/>
							<TextField
								required
								id="price"
								name="price"
								label="Price"
								type="number"
								variant="outlined"
								inputProps={{ step: 0.01 }}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
								}}
								placeholder="Price"
							/>
							<TextField
								required
								multiline
								rows={4}
								id="desc"
								name="desc"
								label="Description"
								type="text"
								variant="outlined"
								placeholder="Guitar Description"
							/>
							<TextField
								required
								id="img"
								name="img"
								label="Image URL"
								type="url"
								variant="outlined"
								placeholder="Image URL"
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button className="modal-buttons" onClick={this.handleModalClose} variant="outlined" color="error">Cancel</Button>
						<Button className="modal-buttons" type="submit" variant="contained" color="success">Add Guitar</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default Input;
