import React from 'react';

const ListItem = ({ items, deleteItem }) => {

	return (
		<ul>
			{items && items.length > 0 ? (
				items.map((item) => {
					return (
						<li key={item._id} onClick={() => deleteItem(item._id)}>
							{item.title}
						</li>
					);
				})
			) : (
				<li>No guitars available</li>
			)}
		</ul>
	);
};

export default ListItem;
