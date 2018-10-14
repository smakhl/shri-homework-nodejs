const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { getServerUptime, getDistinctEvents } = require("./helpers");
require('dotenv').config();
const db = require('./events.json');
const pageNotFoundResponse = `<h1>Page not found</h1>`;

app.use(bodyParser.urlencoded({ extended: true }));

app.all("/status", (req, res) => res.send(getServerUptime()));

app.get('/api/events', validateTypeReqParams, eventsResponse);
app.post('/api/events', validateTypeReqParams, eventsResponse);

app.get('*', (req, res) => res.status(404).send(pageNotFoundResponse));
app.post('*', (req, res) => res.status(404).send(pageNotFoundResponse));

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send(err);
})

app.listen(process.env.API_PORT, () => {
    console.log(`Smarthouse API started on http://localhost:${process.env.API_PORT}`)
});

function validateTypeReqParams(req, res, next) {
    const request = req.query || req.body;
    if (request.type) {
        const requestedTypes = request.type.split(":");
        const existingTypes = getDistinctEvents(db);
        requestedTypes.forEach(type => {
            if (!existingTypes.has(type)) {
                res.status(400).send("Incorrect type");
                return next("Incorrect type caught in middleware: " + type);
            }
        });
    }
    next();
}

function eventsResponse(req, res) {
    let response = db;
    const request = req.query || req.body;
    if (request.type) {
        const requestedTypes = request.type.split(":");
        const filteredEvents = db.events.filter(e => requestedTypes.includes(e.type));
        response = { events: [...filteredEvents] };
    }

    if (request.limit || request.skip) {
        const skip = request.skip || 0;
        const limit = request.limit || process.env.DEFAULT_LIMIT;
        response = { events: response.events.slice(+skip, +skip + +limit) };
    }

    res.send(response);
}