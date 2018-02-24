import React, { Component } from 'react';
import StatsTable from './StatsTable';
import StatsChart from './StatsChart';
import Axios from 'axios';

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
			return 'Loading...';
		}
		
		if (error) {
			return <p style={{ color: 'red' }}>{ error.message }</p>;
		}
		
		return ([
			<StatsTable
				data={data}
			/>,
			<StatsChart
				data={data}
			/>,
		]);
	}
}

export default Stats;
