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

        let matchDateArray = [];

        class matchDate {
            constructor(game,league,date){
                this.game = game;
                this.league = league;
                this.date = date;
                this.matches = [];
            }
        }

        this.props.matches.forEach((match) => {
            const d = new Date(match.date)
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const humanDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()

            const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()

            if(typeof matchDateArray[date + "_" + match.leagueName] == 'undefined'){
                matchDateArray[date + "_" + match.leagueName] = new matchDate(match.gameName,match.leagueName,humanDate);
            
                matchDateArray[date + "_" + match.leagueName].matches.push(match)
            } else {
                matchDateArray[date + "_" + match.leagueName].matches.push(match)
            }
        })

        const getmatchDate = () => {
            let content = [];

            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var timezone = date.toTimeString().slice(9,17);
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ampm /*+ ' ' + timezone */;
                return strTime;
            }
            
            for (let matchDate in matchDateArray) {
                content.push(
                <div className="match-date">
                    <span className="date">{matchDateArray[matchDate].date}&nbsp;&nbsp;</span>
                    <span className="game">{matchDateArray[matchDate].game}</span>
                    {matchDateArray[matchDate].matches.map((match => {
                        let d = new Date(match.date)

                        return (
                            <div className="match">
                                <div className="time">
                                    {formatAMPM(d)}
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
                            {console.log(match)}
                            </div>
                        )
                    }))}
                </div>)
            }
            return content;
        };

        return (
            <div className="grid">
                <div className="row col-2 filter">
                    <h1>Schedule</h1>
                    <h2>Filters</h2>
                    <Calendar placeholder="Select Date Range" selectionMode="range" onChange={(e) => setDate(e.value)}></Calendar>
                    <Dropdown placeholder="Select League" options={leagueItems} onChange={(e) => setCity(e.value)}/>
                </div>
                <div className="row col-2"></div>
                <div className="col">
                    {getmatchDate()}
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async (context) => {
    
    try {
        const results = await sql_query(`
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
    }
}

export default Page;