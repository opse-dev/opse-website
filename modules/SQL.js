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