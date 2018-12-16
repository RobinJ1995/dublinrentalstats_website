import React, { Component } from 'react';
import Data from './Data';
import difference, { formatPercentage } from './difference';

const MONTHS_IN_YEAR = 12;

const english = {
    [Data.RENT]: 'Rent',
    [Data.SHARING]: 'House sharing',
    [Data.CITY]: 'Dublin City',
    [Data.COUNTY]: 'County Dublin'
};

class StatsEnglish extends Component {
	render() {
		const {
			data,
			colours,
        } = this.props;
        
        const monthData = data.getMonths()
            .map((month, i, months) => [month, data.getMonth(month), data.getMonth(months[i - 1])])
            .filter(([month, data, previous]) => previous.hasData()).slice(-MONTHS_IN_YEAR);
        const nMonths = monthData.length;
            
        return <div className="statsEnglish">
            {[
                [Data.RENT, Data.CITY],
                [Data.RENT, Data.COUNTY],
                [Data.SHARING, Data.CITY],
                [Data.SHARING, Data.COUNTY]
            ].map(([what, where]) => {
                const percentage = monthData.map(([month, data, previous]) => difference(previous.getAverage(what, where), data.getAverage(what, where)))
                    .reduce((acc, cur) => acc + cur, 0);
                

                return <p>{english[what]} prices for {english[where]} have gone {percentage >= 0 ? 'up' : 'down'} by {formatPercentage(percentage, false)} in the last {nMonths} months. That's an average of {formatPercentage(percentage / nMonths, true, 0, 0.5)} per month.</p>

            })}
        </div>
	}
}

export default StatsEnglish;
