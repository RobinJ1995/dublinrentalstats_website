export default class DayData {
    static RENT = 'rent';
    static SHARING = 'sharing';

    static CITY = 'city';
    static COUNTY = 'county';

    constructor(data) {
        this.data = data;
    }

    get = (what, where) => {
        return this.data[what][where];
    }
}