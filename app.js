// @ts-check
const path = require('path');
const express = require('express');

const PORT = 5000;
const PATH = path.resolve(__dirname, "public");



function main() {
    const app = express();
    const delay = parseInt(process.argv[2], 10) || 0;
    
    if (delay) {
        app.use("/*plugins.js", (req, res, next) => {
            setTimeout(() => next(), delay);
        });
    }
    
    app.use(express.static(PATH));
    
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(PATH, "index.html"));
    });
    
    app.listen(PORT, err => {
        if (err) console.error(err);
        console.log('serving:', PATH);
        console.log('listening on port:', PORT);
        if (delay) console.log('delay of:', delay);
        console.log('Press Ctrl+C to quit.');
    });
}

if (require.main === module) {
    main();
}
