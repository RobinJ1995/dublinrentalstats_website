import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts'
import { setColourOpacity } from './colours';
const HighchartsMore = require('highcharts-more')(ReactHighcharts.Highcharts)

const getColourScheme = baseColour => ({
	range: {
		color: baseColour,
		fillOpacity: 0.3,
	},
	median: {
		color: baseColour,
		opacity: 1.0,
		marker: {
			fillColor: 'white',
		},
	},
	average: {
		color: setColourOpacity(baseColour, 0.6),
		marker: {
			fillColor: 'grey',
		},
	},
});

const getSeries = (title, data, select, colours) => [
	{
		name: title,
		type: 'arearange',
		data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(select(data[date]).lowest), parseFloat(select(data[date]).highest)])),
		lineWidth: 0,
		marker: {
			enabled: false
		},
		zIndex: 0,
		...getColourScheme(select(colours)).range,
	}, {
		name: `${title} (median)`,
		linkedTo: ':previous',
		data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(select(data[date]).median)])),
		lineWidth: 3,
		marker: {
			lineWidth: 2,
		},
		zIndex: 2,
		...getColourScheme(select(colours)).median,
	}, {
		name: `${title} (average)`,
		linkedTo: ':previous',
		data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(select(data[date]).average)])),
		lineWidth: 2,
		marker: {
			lineWidth: 1,
		},
		zIndex: 1,
		...getColourScheme(select(colours)).average,
	},
	
	
];
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
		type: 'datetime',
		labels: {
			formatter: function() {
				return new Date(this.value).toDateString();
			}
		}
	},

	yAxis: {
		title: {
			text: 'Prices (€/month)'
		},
		min: 0,
		max: 5000,
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
		...getSeries('Rent in Dublin City', data, x => x.rent.city, colours),
		...getSeries('Rent in County Dublin', data, x => x.rent.county, colours),
		...getSeries('Sharing in Dublin City', data, x => x.sharing.city, colours),
		...getSeries('Sharing in County Dublin', data, x => x.sharing.county, colours),
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
