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
			data: {},
		};
	}
	
	componentWillMount() {
		const {
			source,
		} = this.props;
		
		this.setState({
			loading: true,
		});
		
		return Axios.get(source).then(
			({ data }) => this.setState({
				loading: false,
				error: false,
				data,
			})
		).catch(
			error => this.setState({
				error,
				loading: false,
			})
		);
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
