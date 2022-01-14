import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

export default function Standings () {
    const [league,setLeague] = useState(null)
    const [leagues, setLeagues] = useState(null)
    const [games,setGames] = useState(null)
    const [game,setGame] = useState(null)
    const [standings,setStandings] = useState(null)

    // Fetch games from db on load
    useEffect(async () => {
        const response = await fetch(`/api/games`)
        const data = await response.json()
        const games = []
        data.forEach(game => {
            games.push({label: game.game_name, value: game.id})
        });
        setGames(games)
    },[]);

    // Fetch leagues from db on state change const game
    useEffect(async () => {
        if(game){
            const response = await fetch(`/api/leagues/${game}`)
            const data = await response.json()
            const leagues = []
            data.forEach(league => {
                leagues.push({label: league.description, value: league.id})
            });
            setLeagues(leagues)
        }
    },[game]);

    // Fetch standings from db on state change const league
    useEffect(async () => {
        const response = await fetch(`/api/standings/${league}`)
        const data = await response.json()
        setStandings(data)
    },[league]);

    return (
        <div className="grid">
            <div className="row col-2 filter">
                <h1>Standings</h1>
                <h2>Filters</h2>
                <Dropdown placeholder="Select Game" options={games} onChange={ (e) => setGame(e.value) } value={game} />
                {(!leagues) ? (
                    null
                ) : (
                    <Dropdown placeholder="Select League" options={leagues} onChange={ (e) => setLeague(e.value) } value={league} />
                )}
            </div>
            <div className="row col-2"></div>
            <div className="col">
                {((!standings) || (standings.length == 0)) ? (
                    <div className="standings-info-container">
                        <Message text='Use the filters to select a league.' style={{'max-width': '400px', 'padding': '20px'}}></Message>
                    </div>
                ) : (
                    <div className="standings">
                        <div className="standing">
                            <div className="rank">
                                Rank
                            </div>
                            <div className="school-name">
                                Team
                            </div>
                            <div></div>
                            <div>
                                Wins/Losses
                            </div>
                        </div>
                        {standings.map((standing, key) => {
                            return (
                                <div key={key} className="standing">
                                    <div className="rank">
                                        {standing.rank}
                                    </div>
                                    <img src={'/logos/' + standing.logo} className="logo" alt={standing.name}/>
                                    <div className="school-name">
                                        {standing.name}
                                    </div>
                                    <div>
                                        <b>{standing.wins ? standing.wins : '0'}</b>W-<b>{standing.losses ? standing.losses : '0'}</b>L
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}