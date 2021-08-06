const exec = require('util').promisify(require('child_process').exec);

async function handler(req, res) {
    if (req.method == "POST") {
        await exec('git pull');
        res.end("Server in sync with git");
    }
}

export default handler;