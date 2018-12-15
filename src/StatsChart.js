import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts'
import Data from './Data';
const HighchartsMore = require('highcharts-more')(ReactHighcharts.Highcharts)

const getConfig = (data, colours) => ({
	chart: {
	},
	
	title: {
		text: null,
	},
	
	credits: {
		enabled: false,
	},
	
	xAxis: {		
		type: 'category'
	},

	yAxis: {
		title: {
			text: 'Prices (€/month)'
		},
		min: 0,
		max: data.getMaxYAxis(),
	},
	
	legend: {
		layout: 'horizontal',
		align: 'center',
		verticalAlign: 'bottom'
	},

	plotOptions: {
		series: {
			label: {
				connectorAllowed: false
			},
		}
	},

	series: [
		...data.getSeries('Rent in Dublin City', Data.RENT, Data.CITY, colours),
		...data.getSeries('Rent in County Dublin', Data.RENT, Data.COUNTY, colours),
		...data.getSeries('Sharing in Dublin City', Data.SHARING, Data.CITY, colours),
		...data.getSeries('Sharing in County Dublin', Data.SHARING, Data.COUNTY, colours),
	],

	responsive: {
		rules: [{
			condition: {
				maxWidth: 740,
			},
			chartOptions: {
				legend: {
					layout: 'vertical',
					align: 'center',
					verticalAlign: 'bottom'
				}
			}
		}]
	}
});

class StatsChart extends Component {
	shouldComponentUpdate(nextProps) {		
		if (JSON.stringify(this.props.data.data) === JSON.stringify(nextProps.data.data) && JSON.stringify(this.props.colours) === JSON.stringify(nextProps.colours)) {
			return false;
		}
		
		return true;
	}
	
	render() {
		const {
			data,
			colours,
		} = this.props;
		
		const config = getConfig(data, colours);
		
		return (
			<ReactHighcharts
				config={config}
			/>
		);
	}
}

export default StatsChart;
