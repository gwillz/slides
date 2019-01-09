// @ts-check
const path = require('path');
const express = require('express');

const PORT = 5000;
const PATH = path.resolve(__dirname, "public");

function main() {
    express()
    
    .use(express.static(PATH))
    
    .get("/", (req, res) => {
        res.sendFile(path.resolve(PATH, "index.html"));
    })
    
    .listen(PORT, err => {
        if (err) console.error(err);
        console.log('serving:', PATH);
        console.log('listening on port:', PORT);
        console.log('Press Ctrl+C to quit.');
    });
}

if (require.main === module) {
    main();
}
