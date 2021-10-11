const { getMatches } = require('../../modules/SQL');

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            let today = new Date(), result = [],
                data = await getMatches();

            let gamesToNotify = data.filter(game => {
                let game_time = new Date(game.date);
                return game_time.getDate() == today.getDate() && game_time.getMonth() == today.getMonth() && game_time.getFullYear() == today.getFullYear();
            });
        
            gamesToNotify.map(game => { result.push(game) });

            res.json(result);
            break;
    
        default:
            res.end("Method not allowed");
            break;
    }
}

export default handler;