import { Component } from "react";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { query } from '../modules/SQL';

class Page extends Component {
    constructor(props) {
        super(props);

        this.leagueItems = [
            {label: 'All Leagues', value: 0},
            {label: 'Hearthstone', value: 5},
            {label: 'League of Legends', value: 2},
            {label: 'Overwatch', value: 3},
            {label: 'Rocket League', value: 4},
            {label: 'Valorant', value: 1},
        ];

        this.matches = this.props.matches.map(d => {
            d.date = new Date(d.date);
            return d;
        });

        this.reduceMatches = (r, a) => {
            let dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            r[a.date.toLocaleDateString("en-US", dateOpts)] = r[a.date.toLocaleDateString("en-US", dateOpts)] || [];
            r[a.date.toLocaleDateString("en-US", dateOpts)].push(a);
            return r;
        }; 

        this.state = {
            filterDate: null,
            filterLeague: 0,
            matchItems: this.matches.reduce(this.reduceMatches, Object.create(null))
        };
    }

    setFilterDate(date) {
        this.setState({ filterDate: date });

        if (date == null && this.state.filterLeague == 0) this.setState({ matchItems: this.matches.reduce(this.reduceMatches, Object.create(null)) });
        else {
            if (this.state.filterLeague == 0) this.setState({ matchItems: this.matches.filter(m => m.date.getDate() == date.getDate() && m.date.getMonth() == date.getMonth() && m.date.getFullYear() == date.getFullYear()).reduce(this.reduceMatches, Object.create(null)) });
            else this.setState({ matchItems: this.matches.filter(m => m.league_id == this.state.filterLeague && m.date.getDate() == date.getDate() && m.date.getMonth() == date.getMonth() && m.date.getFullYear() == date.getFullYear()).reduce(this.reduceMatches, Object.create(null)) });
        }
    }

    setFilterLeague(league) {
        this.setState({ filterLeague: league });

        if (this.state.filterDate == null && league == 0) this.setState({ matchItems: this.matches.reduce(this.reduceMatches, Object.create(null)) });
        else {
            if (this.state.filterDate == null) this.setState({ matchItems: this.matches.filter(m => m.league_id == league).reduce(this.reduceMatches, Object.create(null)) });
            else this.setState({ matchItems: this.matches.filter(m => m.league_id == league && m.date.getDate() == this.state.filterDate.getDate() && m.date.getMonth() == this.state.filterDate.getMonth() && m.date.getFullYear() == this.state.filterDate.getFullYear()).reduce(this.reduceMatches, Object.create(null)) });
        }
    }

    render() {
        return (
            <div className="grid">
                <div className="row col-2 filter">
                    <h1>Schedule</h1>
                    <h2>Filters</h2>
                    <div className="p-inputgroup">
                        <Calendar placeholder="Select Date" onChange={ (e) => this.setFilterDate(e.value) } value={this.state.filterDate} dateFormat="dd M yy" />
                        <Button icon="pi pi-times" className="p-button-text p-button-plain w-2"  onClick={ () => this.setFilterDate(null) } />
                    </div>
                    <Dropdown placeholder="Select League" options={this.leagueItems} onChange={ (e) => this.setFilterLeague(e.value) } value={this.state.filterLeague} />
                </div>
                <div className="row col-2"></div>
                <div className="col">
                    {Object.keys(this.state.matchItems).map((d, key) => {
                        return (
                            <div key={key} className="match-date">
                                <span className="game">{d}</span>
                                {this.state.matchItems[d].map(match => {
                                    return (
                                        <div className="match">
                                            <div className="time">
                                                {match.date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true})}
                                            </div> 
                                            <div className="school-name">
                                                {match.home_name}
                                            </div>
                                            <img src={'/logos/' + match.home_logo} className="logo" alt={match.home_name}/>
                                            <div className="score" style={match.home_score > match.away_score ? {opacity: 1} : null }>{match.home_score}</div>
                                            <div className="vs">vs</div>
                                            <div className="score" style={match.away_score > match.home_score ? {opacity: 1} : null }>{match.away_score}</div>
                                            <img src={'/logos/' + match.away_logo} className="logo" alt={match.away_name}/>
                                            <div className="school-name">
                                                {match.away_name}
                                            </div>
                                            <div>
                                                {(match.vod) ?
                                                    <a target="_blank" href={match.vod}><i class="pi pi-youtube"></i> VOD</a> :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async (context) => {
    
    try {
        const results = await query(`
            SELECT matches.id as id, date, vod, home_id, away_id, matches.league_id, s1.name AS home_name, s2.name AS away_name, home_score, away_score, games.game_name AS gameName, leagues.description AS leagueName, s1.logo_url AS home_logo, s2.logo_url AS away_logo
            FROM matches
            JOIN teams t1 ON home_id = t1.id
            JOIN teams t2 ON away_id = t2.id
            JOIN schools s1 ON t1.school_id = s1.id
            JOIN schools s2 ON t2.school_id = s2.id
            LEFT JOIN leagues ON matches.league_id = leagues.id
            LEFT JOIN games ON leagues.game_id = games.id
            ORDER BY date ASC
        `);

        const matches = JSON.parse(JSON.stringify(results));
        return {
            props: {matches},
        }
    } catch (e) {
        console.log(e.message)
        return {
            props: {matches: false, message: e.message},
        }
    };
}

export default Page;