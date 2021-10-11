import mysql from 'serverless-mysql'

// export const db = (process.env.NODE_ENV == 'production') ? mysql({
//     config: {
//         host     : process.env.DB_LIVE_HOST,
//         port     : process.env.DB_LIVE_PORT,
//         user     : process.env.DB_LIVE_USER,
//         password : process.env.DB_LIVE_PASS,
//         database : process.env.DB_LIVE_NAME
//     }
// })
// : mysql({
//     config: {
//         host     : process.env.DB_STAGE_HOST,
//         port     : process.env.DB_STAGE_PORT,
//         user     : process.env.DB_STAGE_USER,
//         password : process.env.DB_STAGE_PASS,
//         database : process.env.DB_STAGE_NAME
//     }
// });

export const db = mysql({
    config: {
        host     : process.env.DB_STAGE_HOST,
        port     : process.env.DB_STAGE_PORT,
        user     : process.env.DB_STAGE_USER,
        password : process.env.DB_STAGE_PASS,
        database : process.env.DB_STAGE_NAME
    }
});

export async function sql_query(query_string, values = []) {
    try {
        const results = await db.query(query_string, values)
        await db.end()
        return results
    } catch (e) {
        throw Error(e.message)
    }
}