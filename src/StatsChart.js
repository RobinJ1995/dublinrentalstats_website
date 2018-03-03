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
		...getColourScheme(select(colours)).range,
		lineWidth: 0,
		marker: {
			enabled: false,
		},
		zIndex: 0,
	}, {
		name: `${title} (median)`,
		linkedTo: ':previous',
		data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(select(data[date]).median)])),
		...getColourScheme(select(colours)).median,
		lineWidth: 3,
		marker: {
			lineWidth: 2,
			symbol: 'circle',
			...getColourScheme(select(colours)).median.marker,
		},
		zIndex: 2,
	}, {
		name: `${title} (average)`,
		linkedTo: ':previous',
		data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(select(data[date]).average)])),
		...getColourScheme(select(colours)).average,
		lineWidth: 2,
		marker: {
			lineWidth: 1,
			symbol: 'diamond',
			...getColourScheme(select(colours)).average.marker,
		},
		zIndex: 1,
	},
];
const getHighestMedianOrAverage = data => Object.values(data).map(
		rentOrSharing => Object.values(rentOrSharing).map(
			cityOrCounty => Object.values(cityOrCounty).map(
				prices => Math.max(prices.median || 0, prices.average || 0)
			).reduce((max, cur) => Math.max(max, cur))
		).reduce((max, cur) => Math.max(max, cur))
	).reduce((max, cur) => Math.max(max, cur));
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
		max: Math.ceil(getHighestMedianOrAverage(data) / 1000) * 1000,
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
	shouldComponentUpdate(nextProps) {		
		if (JSON.stringify(this.props.data) === JSON.stringify(nextProps.data) && JSON.stringify(this.props.colours) === JSON.stringify(nextProps.colours)) {
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
