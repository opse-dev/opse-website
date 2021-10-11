if(process.env.NODE_ENV == 'production'){
    const mysql = require('serverless-mysql')({
        config: {
            host     : process.env.DB_LIVE_HOST,
            port     : process.env.DB_LIVE_PORT,
            user     : process.env.DB_LIVE_USER,
            password : process.env.DB_LIVE_PASS,
            database : process.env.DB_LIVE_NAME
        }
    });
} else {
    const mysql = require('serverless-mysql')({
        config: {
            host     : process.env.DB_STAGE_HOST,
            port     : process.env.DB_STAGE_PORT,
            user     : process.env.DB_STAGE_USER,
            password : process.env.DB_STAGE_PASS,
            database : process.env.DB_STAGE_NAME
        }
    });
}
    

exports.query = async (query) => {
    let res = await mysql.query(query);
    await mysql.end();
    return res;
}

exports.getTeams = async () => {
    let res = await mysql.query('SELECT * FROM `teams`');
    await mysql.end();
    return res;
}

exports.getSchools = async () => {
    let res = await mysql.query('SELECT * FROM `schools`');
    await mysql.end();
    return res;
}

exports.getPlayers = async () => {
    let res = await mysql.query('SELECT * FROM `players`');
    await mysql.end();
    return res;
}

exports.getLeagues = async () => {
    let res = await mysql.query('SELECT * FROM `games`');
    await mysql.end();
    return res;
}

exports.getMatches = async () => {
    let res = await mysql.query('SELECT * FROM `matches`');
    await mysql.end();
    return res;
}