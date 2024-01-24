import React from 'react';
import Guitars from './components/Guitars';
import './App.css';

const App = () => {

	document.title = 'Shounak\'s Guitars';

	return (
		<div className="App">
			<Guitars />
		</div>
	);
};

export default App;
