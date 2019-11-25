import React, { Component } from 'react';
import DepressingQuote from './DepressingQuote';
import Stats from './Stats';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Dublin Rental Stats</h1>
					<h2><DepressingQuote /></h2>
				</header>
				<div>
					<Stats
						source="https://data.dublinrentalstats.eu/stats.json"
					/>
				</div>
				<footer>
					<p style={{
						fontSize: '8px',
						color: 'grey',
					}}>Statistics are based on data that is publicly available on Daft.ie. I am not affiliated with Daft.ie, and do not take responsibility for the correctness of this data, or for anything else for that matter.</p>
				</footer>
			</div>
		);
	}
}

export default App;
