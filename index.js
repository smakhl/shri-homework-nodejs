const express = require('express');
const app = express();
const port = 8000;
const events = require('./events.json').events;
const eventTypes = new Set(events.map(e => e.type));
console.log(eventTypes)

app.get('/', (req, res) => {
    const uptime = getUptime();
    res.send(`${uptime}`);
});

app.get('/api/events', validateType, (req, res) => {
    if (req.query && req.query.type) {
        const types = req.query.type.split(":");
        res.send(types);
    }
    else
        res.send(events);
});

app.get('*', (req, res) => {
    res.status(404).send(`<h1>Page not found</h1>`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getUptime() {
    const uptimeInSecs = Math.floor(process.uptime());
    const date = new Date(null);
    date.setSeconds(uptimeInSecs);
    return date.toISOString().substr(11, 8);
}

function validateType(err, req, res, next) {
    if (req.query && req.query.type) {
        const types = req.query.type.split(":");
        types.forEach(type => {
            console.log("ha")
            if (!eventTypes.has(type)){
                res.status(400).send("Incorrect type");
            }
        });
    }
    // next();
}