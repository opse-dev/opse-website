import { server } from '../config';
import { Component } from "react";
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { sql_query } from '../lib/db';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const leagueItems = [
            {label: 'Hearthstone', value: 'hs'},
            {label: 'League of Legends', value: 'lol'},
            {label: 'Overwatch', value: 'ow'},
            {label: 'Rocket League', value: 'rl'},
            {label: 'Valorant', value: 'val'}
        ];

        console.log(this.props)

        return (
            <div className="grid">
                <div className="row col-2 filter">
                    <h1>Schedule</h1>
                    <h2>Filters</h2>
                    <Calendar placeholder="Select Date Range" selectionMode="range" onChange={(e) => setDate(e.value)}></Calendar>
                    <Dropdown placeholder="Select League" options={leagueItems} onChange={(e) => setCity(e.value)}/>
                </div>
                <div className="col">
                    {//this.props.matches.map((match) => (<h3>{match.date}</h3>))}
    }
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async (context) => {
    
    try {
        const results = await sql_query(`
            SELECT * FROM matches
        `);

        const matches = JSON.parse(JSON.stringify(resuts));
        return {
            props: {matches},
        }
    } catch (e) {
        return {
            props: {matches: false, message: e.message},
        }
    }
}

export default Page;