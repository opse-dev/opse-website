const { getSchedule } = require('../../../modules/SQL');

async function handler(req, res) {
    //const { league } = req.query

    switch (req.method) {
        case "GET":
            let data = await getSchedule();
            res.json(data);
            break;
    
        default:
            res.end("Method not allowed");
            break;
    }
}

export default handler;