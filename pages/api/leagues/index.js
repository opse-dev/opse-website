import { getLeague } from '../../../modules/SQL';

async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            let data = await getLeague();
            res.json(data);
            break;

        default:
            res.end('Method not allowed');
            break;
    }
}

export default handler;