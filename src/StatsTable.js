import React, { Component } from 'react';
import { setColourOpacity } from './colours';
import Data from './Data';
import { shorten } from './months';
import difference, { formatPercentage } from './difference';

const formatNumber = number => parseFloat(number).toFixed(2);
const formatDate = (date, tiny = false) => tiny ? `${date.getDate()}/${date.getMonth() + 1}` : `${date.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getFullYear()}`;

const fancyTH = (text, colour, colSpan = 1) => <th key={`${text}-${colour}`} colSpan={colSpan} style={{ backgroundColor: colour, textShadow: '0px 0px 5px #282828' }}>{text}</th>;
const renderPriceCells = (data, colour, tiny = false) => ([
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
		title={data.prices && `Information based on ${data.prices.length} property listings`}
	>
		€{formatNumber(data.lowest)}<br />
		€{formatNumber(data.highest)}
	</td>,
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
		title={data.prices && `Information based on ${data.prices.length} property listings`}
	>
		{data.median && `€${formatNumber(data.median)}`}
		{data.median && data.average && <br />}
		{data.average && `€${formatNumber(data.average)}`}
	</td>
]);
const renderMonthPriceCells = (data, what, where, colour, previous, tiny = false) => ([
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
	>
		€{formatNumber(data.getMedian(what, where))}<br />

		{previous.hasData() && (
			<span>{formatPercentage(difference(previous.getMedian(what, where), data.getMedian(what, where)))}</span>
		)}
	</td>,
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
	>
		€{formatNumber(data.getAverage(what, where))}<br />

		{previous.hasData() && (
			<span>{formatPercentage(difference(previous.getAverage(what, where), data.getAverage(what, where)))}</span>
		)}
	</td>
])

const renderLarge = (data, colours) => (
	<table style={{ width: '100%' }}>
		<thead style={{
			backgroundColor: '#003A49',
			color: 'white',
		}}>
			<tr>
				<th rowSpan="3">Date</th>
				<th colSpan="4">Renting</th>
				<th colSpan="4">Sharing</th>
			</tr>
			<tr>
				{[
					fancyTH('Dublin City', colours.rent.city, 2),
					fancyTH('County Dublin', colours.rent.county, 2),
					fancyTH('Dublin City', colours.sharing.city, 2),
					fancyTH('County Dublin', colours.sharing.county, 2),
				]}
			</tr>
			<tr>
				{[
					fancyTH('Median', colours.rent.city),
					fancyTH('Average', colours.rent.city),
					fancyTH('Median', colours.rent.county),
					fancyTH('Average', colours.rent.county),
					fancyTH('Median', colours.sharing.city),
					fancyTH('Average', colours.sharing.city),
					fancyTH('Median', colours.sharing.county),
					fancyTH('Average', colours.sharing.county),
				]}
			</tr>
		</thead>
		<tbody style={{
			backgroundColor: '#DFDFDF',
			color: 'black',
		}}>
			{data.getMonths().map((month, i, months) => [month, data.getMonth(month), data.getMonth(months[i - 1])]).map(([month, data, previous]) => 
				<tr>
					<th>{month}</th>
					{renderMonthPriceCells(data, Data.RENT, Data.CITY, colours.rent.city, previous)}
					{renderMonthPriceCells(data, Data.RENT, Data.COUNTY, colours.rent.county, previous)}
					{renderMonthPriceCells(data, Data.SHARING, Data.CITY, colours.sharing.city, previous)}
					{renderMonthPriceCells(data, Data.SHARING, Data.COUNTY, colours.sharing.county, previous)}
				</tr>
			)}
			
			{/* {data.getDates().map(date => (
				<tr>
					<th title={new Date(date).toDateString()}>{formatDate(new Date(date))}</th>
					{renderPriceCells(data.getDay(date).get(Data.RENT, Data.CITY), colours.rent.city)}
					{renderPriceCells(data.getDay(date).get(Data.RENT, Data.COUNTY), colours.rent.county)}
					{renderPriceCells(data.getDay(date).get(Data.SHARING, Data.CITY), colours.sharing.city)}
					{renderPriceCells(data.getDay(date).get(Data.SHARING, Data.COUNTY), colours.sharing.county)}
				</tr>
			))} */}
		</tbody>
	</table>
);
const renderSmall = (data, colours, tiny = false) => ([
	<table style={{ width: '100%' }}>
		<thead style={{
			backgroundColor: '#003A49',
			color: 'white',
		}}>
			<tr>
				<th rowSpan="3">Date</th>
				<th colSpan="4">Renting</th>
			</tr>
			<tr>
				{[
					fancyTH('Dublin City', colours.rent.city, 2),
					fancyTH('County Dublin', colours.rent.county, 2),
				]}
			</tr>
			<tr>
				{[
					fancyTH('Median', colours.rent.city),
					fancyTH('Average', colours.rent.city),
					fancyTH('Median', colours.rent.county),
					fancyTH('Average', colours.rent.county),
				]}
			</tr>
		</thead>
		<tbody style={{
			backgroundColor: '#DFDFDF',
			color: 'black',
		}}>
			{data.getMonths().map((month, i, months) => [month, data.getMonth(month), data.getMonth(months[i - 1])]).map(([month, data, previous]) => (
				<tr>
					{ tiny
					? <th style={{...(tiny && { fontSize: '0.8em' })}}>{shorten(month)}</th>
					: <th>{month}</th> }
					
					{renderMonthPriceCells(data, Data.RENT, Data.CITY, colours.rent.city, previous, tiny)}
					{renderMonthPriceCells(data, Data.RENT, Data.COUNTY, colours.rent.county, previous, tiny)}
				</tr>
			))}
		</tbody>
	</table>,
	<table style={{ width: '100%' }}>
		<thead style={{
			backgroundColor: '#003A49',
			color: 'white',
		}}>
			<tr>
				<th rowSpan="3">Date</th>
				<th colSpan="4">Sharing</th>
			</tr>
			<tr>
				{[
					fancyTH('Dublin City', colours.sharing.city, 2),
					fancyTH('County Dublin', colours.sharing.county, 2),
				]}
			</tr>
			<tr>
				{[
					fancyTH('Median', colours.sharing.city),
					fancyTH('Average', colours.sharing.city),
					fancyTH('Median', colours.sharing.county),
					fancyTH('Average', colours.sharing.county),
				]}
			</tr>
		</thead>
		<tbody style={{
			backgroundColor: '#DFDFDF',
			color: 'black',
		}}>
			{data.getMonths().map((month, i, months) => [month, data.getMonth(month), data.getMonth(months[i - 1])]).map(([month, data, previous]) => (
				<tr>
					{ tiny
					? <th style={{...(tiny && { fontSize: '0.8em' })}}>{shorten(month)}</th>
					: <th>{month}</th> }
					{renderMonthPriceCells(data, Data.SHARING, Data.CITY, colours.sharing.city, previous, tiny)}
					{renderMonthPriceCells(data, Data.SHARING, Data.COUNTY, colours.sharing.county, previous, tiny)}
				</tr>
			))}
		</tbody>
	</table>
]);

class StatsTable extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			screenSize: 'large',
		};
	}
	
	componentDidMount() {
		this.onResize();
		window.addEventListener("resize", this.onResize);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}
	
	onResize = () => this.setState({
		screenSize: [
			['tiny', 0],
			['small', 480],
			['large', 800]
		].reduce((res, x) => window.innerWidth > x[1] ? x[0] : res, null),
	})

	render() {
		const {
			data,
			colours,
		} = this.props;
		const {
			screenSize,
		} = this.state;
		
		return {
			tiny: renderSmall,
			small: renderSmall,
			large: renderLarge
		}[screenSize](data, colours, screenSize === 'tiny');
	}
}

export default StatsTable;
