import months from './months';

export default class DayData {
    constructor(data, month) {
        this.month = month;

        this.data = Object.keys(data).filter(dateStr => {
            const date = new Date(dateStr);

            return month === months[date.getMonth()] + ' ' + date.getFullYear();
        }).map(date => data[date]);
    }

    getLowest = (what, where) => Object.values(this.data).map(data => data[what][where].lowest)
        .filter(val => val !== undefined)
        .reduce((prev, cur) => Math.min(prev, cur), Number.MAX_VALUE);
    
    getHighest = (what, where) => Object.values(this.data).map(data => data[what][where].highest)
        .filter(val => val !== undefined)
        .reduce((prev, cur) => Math.max(prev, cur), Number.MIN_VALUE);
    
    getAverage = (what, where) => Object.values(this.data).map(data => data[what][where].average)
        .filter(val => val !== undefined)
        .reduce((prev, cur) => prev + cur, 0) / Object.keys(this.data).length;
    
    getMedian = (what, where) => Object.values(this.data).map(data => data[what][where].median)
        .filter(val => val !== undefined)
        .reduce((prev, cur) => prev + cur, 0) / Object.keys(this.data).length;
    
    getMonth = () => this.month;

    hasData = () => this.data.length > 0;
}