import mysql from 'serverless-mysql';

export const db =
    process.env.NODE_ENV == 'production'
        ? mysql({
              config: {
                  host: process.env.DB_LIVE_HOST,
                  port: process.env.DB_LIVE_PORT,
                  user: process.env.DB_LIVE_USER,
                  password: process.env.DB_LIVE_PASS,
                  database: process.env.DB_LIVE_NAME,
              },
          })
        : mysql({
              config: {
                  host: process.env.DB_STAGE_HOST,
                  port: process.env.DB_STAGE_PORT,
                  user: process.env.DB_STAGE_USER,
                  password: process.env.DB_STAGE_PASS,
                  database: process.env.DB_STAGE_NAME,
              },
          });

export async function query(query, values = []) {
    let res = await db.query(query, values);
    await db.end();
    return res;
}

export async function getTeams() {
    let res = await db.query('SELECT * FROM `teams`');
    await db.end();
    return res;
}

export async function getSchools() {
    let res = await db.query('SELECT * FROM `schools`');
    await db.end();
    return res;
}

export async function getPlayers() {
    let res = await db.query('SELECT * FROM `players`');
    await db.end();
    return res;
}

export async function getGames() {
    let res = await db.query('SELECT * FROM `games`');
    await db.end();
    return res;
}

export async function getLeague(game) {
    let res = game
        ? await db.query(`SELECT * FROM leagues WHERE game_id = ${game}`)
        : await db.query('SELECT * FROM leagues');
    await db.end();
    return res;
}

export async function getMatches() {
    let res = await db.query('SELECT * FROM `matches`');
    await db.end();
    return res;
}

export async function getStandings(league) {
    let res = await db.query(`
        SELECT name, logo, wins, losses,
        @prev_bound := @ci_lower_bound AS prev,
        @ci_lower_bound := ci_lower_bound,
        @rank := IF(@prev_bound != @ci_lower_bound, @rank + @repeat, @rank) AS rank,
        @repeat := IF(@prev_bound != @ci_lower_bound, @repeat := 1, @repeat + 1)
        FROM (SELECT teams.id AS id,
        schools.name AS name,
        schools.logo_url as logo,
        @wins := (q1.wins + q2.wins) AS wins,
        @lossses := (q1.losses + q2.losses) AS losses,
        @ci_lower_bound := ((@wins + 1.9208) / (@wins + @lossses) - 1.96 * SQRT((@wins * @lossses) / (@wins + @lossses) + 0.9604) / (@wins + @lossses)) / (1 + 3.8416 / (@wins + @lossses)) AS ci_lower_bound
        FROM teams
        LEFT JOIN schools ON school_id = schools.id
        LEFT JOIN (SELECT home_id,
        COUNT(CASE WHEN home_score > away_score THEN 1 END) AS wins,
        COUNT(CASE WHEN home_score < away_score THEN 1 END) AS losses
        FROM matches
        GROUP BY home_id) q1 ON q1.home_id = teams.id
        LEFT JOIN (SELECT away_id,
        COUNT(CASE WHEN away_score > home_score THEN 1 END) AS wins,
        COUNT(CASE WHEN away_score < home_score THEN 1 END) AS losses
        FROM matches
        GROUP BY away_id) q2 ON q2.away_id = teams.id,
        (SELECT @rank := 1, @prev_bound := NULL, @ci_lower_bound := 0, @repeat := 0) AS x
        WHERE league_id = ${league}
        ORDER BY ci_lower_bound DESC) t1
    `);
    await db.end();
    return res;
}
