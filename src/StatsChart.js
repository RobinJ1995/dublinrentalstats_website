import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts'
const HighchartsMore = require('highcharts-more')(ReactHighcharts.Highcharts)

const getConfig = (data) => ({
	chart: {
		type: 'arearange',
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
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },

    series: [
    {
        name: 'Sharing in County Dublin',
        data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(data[date].sharing.county.lowest), parseFloat(data[date].sharing.county.highest)])),
        color: 'maroon',
    }, {
        name: 'Rent in City Centre',
        data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(data[date].rent.city.lowest), parseFloat(data[date].rent.city.highest)])),
    }, {
        name: 'Sharing in City Centre',
        data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(data[date].sharing.city.lowest), parseFloat(data[date].sharing.city.highest)])),
    }, {
        name: 'Rent in County Dublin',
        data: Object.keys(data).map(date => ([new Date(date).getTime(), parseFloat(data[date].rent.county.lowest), parseFloat(data[date].rent.county.highest)])),
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
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
		} = this.props;
		
		const config = getConfig(data);
		
		return (
			<ReactHighcharts
				config={config}
			/>
		);
	}
}

export default StatsChart;
