const { getGames } = require('../../modules/SQL');

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            let data = await getGames();
            res.json(data);
            break;
    
        default:
            res.end("Method not allowed");
            break;
    }
}

export default handler;