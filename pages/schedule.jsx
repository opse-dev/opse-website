import { server } from '../config';
import { Component } from "react";
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

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

        return (
            <div className="grid">
                <div className="row col-2 filter">
                    <h1>Schedule</h1>
                    <h2>Filters</h2>
                    <Calendar placeholder="Select Date Range" selectionMode="range" onChange={(e) => setDate(e.value)}></Calendar>
                    <Dropdown placeholder="Select League" options={leagueItems} onChange={(e) => setCity(e.value)}/>
                </div>
                <div className="col">
                    {//matches.map(matches => <h3>{matches.title}</h3>)
                    }
                </div>
            </div>
        )
    }
}

// export const getServerSideProps = async (context) => {
//     const res = await fetch(`${server}/api/schedule`)

//     const matches = await res.json()

//     if (!matches) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: {},
//     }
// }

export default Page;