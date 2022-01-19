const { getLeague } = require('../../../modules/SQL');

async function handler(req, res) {
    const { game } = req.query

    switch (req.method) {
        case "GET":
            let data = await getLeague(game);
            res.json(data);
            break;
    
        default:
            res.end("Method not allowed");
            break;
    }
}

export default handler;