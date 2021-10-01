const { query } = require('../../modules/SQL');

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            let data = await query('SELECT * FROM `games`');
            console.log(data);
            res.end("TEST");
            break;
    
        default:
            res.end("TEST");
            break;
    }
}

export default handler;