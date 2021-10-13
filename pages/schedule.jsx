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

        let gameDateArray = [];

        class GameDate {
            constructor(game,date){
                this.game = game;
                this.date = date;
                this.games = [];
            }
        }

        this.props.matches.forEach((match) => {
            const d = new Date(match.date)
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const humanDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()

            const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()

            if(typeof gameDateArray[date + "_" + match.leagueName] == 'undefined'){
                gameDateArray[date + "_" + match.leagueName] = new GameDate(match.leagueName,humanDate);
            
                gameDateArray[date + "_" + match.leagueName].games.push(match)
            } else {
                gameDateArray[date + "_" + match.leagueName].games.push(match)
            }
        })

        return (
            <div className="grid">
                <div className="row col-2 filter">
                    <h1>Schedule</h1>
                    <h2>Filters</h2>
                    <Calendar placeholder="Select Date Range" selectionMode="range" onChange={(e) => setDate(e.value)}></Calendar>
                    <Dropdown placeholder="Select League" options={leagueItems} onChange={(e) => setCity(e.value)}/>
                </div>
                <div className="col">
                    {gameDateArray.forEach((gameDate) => (
                        console.log(gameDate)
                    ))}
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async (context) => {
    
    try {
        const results = await sql_query(`
            SELECT matches.id as id, date, home_id, away_id, matches.league_id, s1.name AS home_name, s2.name AS away_name, t1.school_id, t2.school_id, home_score, away_score, leagues.description AS leagueName, s1.logo_url AS home_logo, s2.logo_url AS away_logo
            FROM matches
            JOIN teams t1 ON home_id = t1.id
            JOIN teams t2 ON away_id = t2.id
            JOIN schools s1 ON t1.school_id = s1.id
            JOIN schools s2 ON t2.school_id = s2.id
            LEFT JOIN leagues ON matches.league_id = leagues.id
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