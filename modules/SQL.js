import mysql from 'serverless-mysql';

export const db = (process.env.NODE_ENV == 'production') ? mysql({
        config: {
            host     : process.env.DB_LIVE_HOST,
            port     : process.env.DB_LIVE_PORT,
            user     : process.env.DB_LIVE_USER,
            password : process.env.DB_LIVE_PASS,
            database : process.env.DB_LIVE_NAME
        }
    })
    : mysql({
        config: {
            host     : process.env.DB_STAGE_HOST,
            port     : process.env.DB_STAGE_PORT,
            user     : process.env.DB_STAGE_USER,
            password : process.env.DB_STAGE_PASS,
            database : process.env.DB_STAGE_NAME
        }
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

export async function getLeagues() {
    let res = await db.query('SELECT * FROM `games`');
    await db.end();
    return res;
}

export async function getMatches() {
    let res = await db.query('SELECT * FROM `matches`');
    await db.end();
    return res;
}