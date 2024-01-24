import React, { useState } from 'react';
import Card                from '@mui/material/Card';
import CardContent         from '@mui/material/CardContent';
import CardMedia           from '@mui/material/CardMedia';
import Button              from '@mui/material/Button';
import Typography          from '@mui/material/Typography';
import { CardActionArea }  from '@mui/material';
import Dialog              from '@mui/material/Dialog';
import DialogActions       from '@mui/material/DialogActions';
import DialogContent       from '@mui/material/DialogContent';
import DialogTitle         from '@mui/material/DialogTitle';
import IconButton          from '@mui/material/IconButton';
import DeleteIcon          from '@mui/icons-material/Delete';
import EditIcon            from '@mui/icons-material/Edit';
import InputAdornment      from '@mui/material/InputAdornment';
import Stack               from '@mui/material/Stack';
import TextField           from '@mui/material/TextField';

const ListItem = ({ items, deleteItem, editItem }) => {

	const [openDialog, setOpenDialog] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [editedContent, setEditedContent] = useState({});
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

	const handleCardClick = (item) => {
		setSelectedItem (item);
		setEditMode (false);
		setEditedContent({});
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setSelectedItem (null);
		setEditMode (false);
		setEditedContent({});
		setOpenDialog(false);
	}

	const handleDelete = () => {
		console.log (`Deleting item with title: ${selectedItem.title}`);
		setDeleteConfirmOpen(true);
		//	deleteItem(selectedItem._id);	
		//	handleCloseDialog();
	}

	const handleConfirmDelete = () => {
		deleteItem (selectedItem._id);
		setDeleteConfirmOpen (false);
		handleCloseDialog();
	}

	const handleCancelDelete = () => {
		setDeleteConfirmOpen (false);
	}
	const handleEdit = () => {
		setEditMode (true);
		setEditedContent({
			_id: selectedItem._id,
			title: selectedItem.title,
			img: selectedItem.img,
			price: selectedItem.price,
			desc: selectedItem.desc,
		});
	}

	const handleSave = () => {
		console.log ('New Details', editedContent);
		editItem (editedContent);
		setEditMode (false);
		setEditedContent ({});
		handleCloseDialog();
	}

	const handleCancelEdit = () => {
		setEditMode (false);
		setEditedContent ({});
	}

	return (
		<div className="list-container">
			{items && items.length > 0 ? (
				items.map((item) => {
					return (
						<Card key={item._id} className="card-container">
							<CardActionArea sx={{ height: 1 }} onClick={() => handleCardClick(item)}>
								<CardMedia
									sx={{ height: 250 }}
									image={item.img}
									title={item.title}
								/>
								<CardContent sx={{ minHeight: 100, height: "fit-content" }}>
									<Typography gutterBottom variant="h5" component="div" className="card-title">
										{item.title}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					);
				})
			) : (
				<div>No guitars available</div>
			)}
			<Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth="lg">
				{selectedItem && (
					<div>
						{editMode ? (
							<div>
								<DialogTitle>Edit Guitar Details</DialogTitle>
								<DialogContent className="input-modal-content">
									<Stack spacing={2}>
										<TextField
											required
											id="title"
											name="title"
											label="Guitar Name"
											type="text"
											variant="outlined"
											value={editedContent.title}
											onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
											placeholder="Guitar Name"
										/>
										<TextField
											required
											id="price"
											name="price"
											label="Price"
											type="number"
											variant="outlined"
											value={editedContent.price}
											onChange={(e) => setEditedContent({ ...editedContent, price: e.target.value })}
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
											value={editedContent.desc}
											onChange={(e) => setEditedContent({ ...editedContent, desc: e.target.value })}
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
											value={editedContent.img}
											onChange={(e) => setEditedContent({ ...editedContent, img: e.target.value })}
											placeholder="Image URL"
										/>
									</Stack>
								</DialogContent>
								<DialogActions>
									<Button className="modal-buttons" onClick={handleCancelEdit} variant="outlined" color="error">Cancel</Button>
									<Button className="modal-buttons" onClick={handleSave} variant="contained" color="success">Save</Button>
								</DialogActions>
		
							</div>
						):(
							<div>
								<DialogTitle>
									<Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
										{selectedItem.title}
									</Typography>
								</DialogTitle>
								<DialogContent>
									<img src={selectedItem.img} alt={selectedItem.title} className="dialog-img" />
									<Typography variant="h6" sx={{ marginTop: '2%' }}>
										Price: ${selectedItem.price}
									</Typography>
									<Typography variant="body2" color="text.secondary" sx={{ marginTop: '2%' }}>
										{selectedItem.desc}
									</Typography>
								</DialogContent>
								<DialogActions>
									<IconButton color="primary" size="large" sx={{ width: 'auto' }} onClick={handleEdit}>
										<EditIcon fontSize="inherit" />
									</IconButton>
									<IconButton size="large" sx={{ width: 'auto' }} onClick={handleDelete}>
										<DeleteIcon fontSize="inherit" />
									</IconButton>
								</DialogActions>
							</div>
						)}
					</div>
				)}
			</Dialog>
			<Dialog open={deleteConfirmOpen} onClose={handleCancelDelete}>
				<DialogContent>
					<Typography style={{ fontWeight: 'bold' }}>Are you sure you want to delete this guitar from your store? This is permanent.</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelDelete} color="primary" variant="contained">
						Cancel
					</Button>
					<Button onClick={handleConfirmDelete} color="error" variant="outlined">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ListItem;
