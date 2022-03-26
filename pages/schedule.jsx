import { DatePicker } from '@mantine/dates';
import { query } from '../modules/SQL';
import { useState, useEffect, useRef } from 'react';
import { Select } from '@mantine/core';
import { ChevronDownIcon } from '@heroicons/react/solid';

const Page = ({ matches, games, leagues }) => {
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };

    const matchesContainer = useRef(null);

    const [availableDates, setAvailableDates] = useState(
            Object.keys(matches).map((date) => new Date(date).setHours(0, 0, 0, 0))
        ),
        [filterDate, setFilterDate] = useState(new Date()),
        [filterGame, setFilterGame] = useState('0'),
        [filterLeague, setFilterLeague] = useState('0'),
        [filteredLeagues, setFilteredLeagues] = useState([
            { value: '0', label: 'All Leagues' },
            ...leagues.map((league) => ({
                value: `${league.id}`,
                label: league.description.substring(league.game.length, league.description.length),
            })),
        ]);

    useEffect(() => {
        setFilteredLeagues([
            { value: '0', label: 'All Leagues' },
            ...leagues
                .filter((l) => l.gameId == filterGame)
                .map((league) => ({
                    value: `${league.id}`,
                    label: league.description.substring(league.game.length, league.description.length),
                })),
        ]);
    }, [filterGame]);

    useEffect(() => {
        matchesContainer.current.scrollTop = document.getElementById(filterDate.toISOString())?.offsetTop - 230;
    }, [filterDate]);

    useEffect(() => {
        let date = new Date();
        date.setHours(0, 0, 0, 0);

        let ref = document.getElementById(date.toISOString());

        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }
        if (!ref) {
            date.setDate(date.getDate() - 1);
            ref = document.getElementById(date.toISOString());
        }

        setFilterDate(date);
        if (ref) matchesContainer.current.scrollTop = ref.offsetTop - 230;
    }, []);

    return (
        <div className="p-8">
            <p className="mb-4 text-4xl font-semibold">Schedule</p>
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex w-full gap-4 md:w-1/6 md:flex-col">
                    <Select
                        label="Game"
                        value={filterGame}
                        data={[
                            { value: '0', label: 'All Games' },
                            ...games.map((game) => ({
                                value: `${game.id}`,
                                label: game.game_name,
                            })),
                        ]}
                        onChange={setFilterGame}
                        rightSection={<ChevronDownIcon className="h-6 w-6" />}
                    />
                    <Select
                        label="League"
                        value={filterLeague}
                        data={filteredLeagues}
                        onChange={setFilterLeague}
                        rightSection={<ChevronDownIcon className="h-6 w-6" />}
                    />
                    <DatePicker
                        label="Date"
                        value={filterDate}
                        onChange={setFilterDate}
                        excludeDate={(date) => !availableDates.includes(date.setHours(0, 0, 0, 0))}
                    />
                </div>

                <div
                    ref={matchesContainer}
                    className="mt-2 flex h-screen w-full flex-col gap-8 divide-y divide-gray-500 overflow-hidden overflow-y-scroll bg-gray-800 pl-0 md:pl-8 md:pt-0"
                >
                    {Object.keys(matches).map((day) => {
                        if (
                            matches[day].some((match) => match.gameId == filterGame || filterGame == '0') &&
                            matches[day].some((match) => match.leagueId == filterLeague || filterLeague == '0')
                        ) {
                            return (
                                <div
                                    key={day}
                                    id={new Date(day).toISOString()}
                                    className="flex flex-col gap-4 px-8 md:px-0"
                                >
                                    {/* <span id={new Date(day).toISOString()} className="absolute -mt-28">TEST</span> */}
                                    <p className="pt-8 text-2xl font-semibold">
                                        {new Date(day).toLocaleDateString('en-US', dateOptions)}
                                    </p>

                                    {matches[day]
                                        .sort((a, b) => {
                                            return new Date(a.date) - new Date(b.date);
                                        })
                                        .map((match) => {
                                            return (
                                                <div
                                                    id={match.id}
                                                    key={match.id}
                                                    className="flex items-center gap-4 text-xl font-semibold"
                                                >
                                                    <img
                                                        src={`/game-icons/${match.gameName.replace(/ /g, '_')}.png`}
                                                        className="h-12 w-12"
                                                        alt={match.gameName}
                                                    />
                                                    <span>
                                                        {new Date(match.date).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </span>
                                                    <div className="grid grow grid-cols-2 md:grid-cols-12">
                                                        <div className="col-span-5 hidden items-center justify-end font-semibold md:flex">
                                                            <span>{match.away_name}</span>
                                                        </div>
                                                        <div className="col-span-2 flex w-full items-center justify-center gap-2 text-4xl">
                                                            <img
                                                                src={match.home_logo}
                                                                className="w-12"
                                                                alt={match.home_name}
                                                            />
                                                            <span
                                                                className={`font-semibold ${
                                                                    match.home_score == 0 ? 'text-gray-500' : ''
                                                                }`}
                                                            >
                                                                {match.home_score}
                                                            </span>
                                                            <span className="text-lg text-opse-red">vs</span>
                                                            <span
                                                                className={`font-semibold ${
                                                                    match.away_score == 0 ? 'text-gray-500' : ''
                                                                }`}
                                                            >
                                                                {match.away_score}
                                                            </span>
                                                            <img
                                                                src={match.away_logo}
                                                                className="w-12"
                                                                alt={match.away_name}
                                                            />
                                                        </div>
                                                        <div className="col-span-5 hidden font-semibold md:flex">
                                                            <span>{match.home_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        } else return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const parseResult = (result) => {
        return JSON.parse(JSON.stringify(result));
    };

    let matches = {},
        m = parseResult(
            await query(`
                SELECT matches.id as id, date, vod, home_id, away_id, matches.league_id, s1.name AS home_name, s2.name AS away_name, home_score, away_score, games.game_name AS gameName, games.id AS gameId, leagues.description AS leagueName, s1.logo_url AS home_logo, s2.logo_url AS away_logo
                FROM matches
                JOIN teams t1 ON home_id = t1.id
                JOIN teams t2 ON away_id = t2.id
                JOIN schools s1 ON t1.school_id = s1.id
                JOIN schools s2 ON t2.school_id = s2.id
                LEFT JOIN leagues ON matches.league_id = leagues.id
                LEFT JOIN games ON leagues.game_id = games.id
                ORDER BY date ASC
            `)
        ),
        leagues = parseResult(
            await query(`
                SELECT leagues.id as id, leagues.description as description, games.id as gameId, games.game_name as game, games.logo_url as logo
                FROM leagues
                JOIN games on leagues.game_id = games.id
            `)
        ),
        games = await fetch(new URL('/api/games', 'http://localhost:3000')).then((res) => res.json());

    m.reverse().forEach((match) => {
        let date = new Date(match.date);
        date.setHours(0, 0, 0, 0);
        if (!matches[date]) matches[date] = [];
        matches[date].push(match);
    });

    return {
        props: {
            matches: matches,
            games,
            leagues,
            title: 'OPSE - Schedule',
        },
    };
};

export default Page;
