import { getMatches } from '../../modules/SQL';

async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            let data = await getMatches();
            res.json(data);
            break;

        default:
            res.end('Method not allowed');
            break;
    }
}

export default handler;
