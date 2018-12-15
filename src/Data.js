import { setColourOpacity } from './colours';
import DayData from './DayData';
import MonthData from './MonthData';
import months from './months';

export default class Data {
    static RENT = 'rent';
    static SHARING = 'sharing';

    static CITY = 'city';
    static COUNTY = 'county';

    constructor(data) {
        this.data = data;
    }

    getSeries = (title, what, where, colours) => [
        {
            name: title,
            type: 'arearange',
            data: this.getMonths().map(month => [month, this.getMonth(month)])
                .map(([month, data]) => [month, parseFloat(data.getLowest(what, where)), parseFloat(data.getHighest(what, where))]),
            ...this.getColourScheme(colours[what][where]).range,
            lineWidth: 0,
            marker: {
                enabled: false,
            },
            zIndex: 0,
        }, {
            name: `${title} (median)`,
            linkedTo: ':previous',
            data: this.getMonths().map(month => [month, this.getMonth(month)])
                .map(([month, data]) => [month, parseFloat(data.getMedian(what, where))]),
            ...this.getColourScheme(colours[what][where]).median,
            lineWidth: 3,
            marker: {
                lineWidth: 2,
                symbol: 'circle',
                ...this.getColourScheme(colours[what][where]).median.marker,
            },
            zIndex: 2,
        }, {
            name: `${title} (average)`,
            linkedTo: ':previous',
            data: this.getMonths().map(month => [month, this.getMonth(month)])
                .map(([month, data]) => [month, parseFloat(data.getAverage(what, where))]),
            ...this.getColourScheme(colours[what][where]).average,
            lineWidth: 2,
            marker: {
                lineWidth: 1,
                symbol: 'diamond',
                ...this.getColourScheme(colours[what][where]).average.marker,
            },
            zIndex: 1,
        },
    ];

    getColourScheme = baseColour => ({
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

    getMaxYAxis = () => Math.ceil(this.getHighestMedianOrAverage(this.data) / 1000) * 1000;

    getHighestMedianOrAverage = () => Object.values(this.data).map(
		rentOrSharing => Object.values(rentOrSharing).map(
			cityOrCounty => Object.values(cityOrCounty).map(
				prices => Math.max(prices.median || 0, prices.average || 0)
			).reduce((max, cur) => Math.max(max, cur))
		).reduce((max, cur) => Math.max(max, cur))
    ).reduce((max, cur) => Math.max(max, cur));
    
    getDates = () => Object.keys(this.data);

    getDay = date => new DayData(this.data[date]);

    getMonths = () => [...new Set(Object.keys(this.data).map(dateStr => {
        const date = new Date(dateStr);
        return months[date.getMonth()] + ' ' + date.getFullYear();
    }))];

    getMonth = month => new MonthData(this.data, month);
}