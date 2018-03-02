import React, { Component } from 'react';
import Spinner from 'react-md-spinner';
import Axios from 'axios';
import StatsTable from './StatsTable';
import StatsChart from './StatsChart';
import COLOURS from './colours';

class Stats extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: false,
			error: false,
			data: null,
			cached: null,
		};
	}
	
	componentWillMount() {
		this.setState({
			loading: true,
		});
		
		this.fetchCachedData();
		
		return this.fetchData().catch(
			error => {
				if (this.state.data && this.state.cached) {
					return console.log('Fetching data failed... but cached data is available.');
				}
				
				return this.setState({
					error,
					loading: false,
				})
			}
		);
	}
	
	fetchCachedData() {
		const cachedJson = window.localStorage.getItem('stats.json');
		
		try {
			const cachedData = JSON.parse(cachedJson);
			
			if (cachedData) {
				return this.setState({
					loading: false,
					error: false,
					data: cachedData,
					cached: true,
				});
			}
		} catch (ex) {
			console.error(`Tried to use cached data, but it didn't work: ${ex}`);
		}
	}
	
	fetchData() {
		const {
			source,
		} = this.props;
		
		return Axios.get(source).then(
			({ data }) => this.onDataLoaded(data)
		);
	}
	
	onDataLoaded(data) {
		try {
			window.localStorage.setItem('stats.json', JSON.stringify(data));
		} catch (ex) {
			// I don't care a whole lot if this fails.
			console.error(ex);
		}
	
		return this.setState({
			loading: false,
			error: false,
			data,
			cached: false,
		});
	}
	
	render() {
		const {
			loading,
			error,
			data,
		} = this.state;
		
		if (loading) {
			const minDist = Math.min(window.innerWidth, window.innerHeight);
			
			return <Spinner
				size={minDist / 5}
				color1={COLOURS.rent.city}
				color2={COLOURS.rent.county}
				color3={COLOURS.sharing.city}
				color4={COLOURS.sharing.county}
				style={{
					margin: minDist / 10,
				}}
			/>;
		}
		
		if (error) {
			return <p style={{ color: 'red' }}>{ error.message }</p>;
		}
		
		return ([
			<StatsTable
				data={data}
				colours={COLOURS}
			/>,
			<StatsChart
				data={data}
				colours={COLOURS}
			/>,
		]);
	}
}

export default Stats;
