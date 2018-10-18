const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const { getServerUptime, getDistinctEvents } = require("./helpers");
let db = {};
const pageNotFoundResponse = "<h1>Page not found</h1>";
const port = process.env.PORT || 8000;
const DEFAULT_LIMIT = 30;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.all("/status", (req, res) => res.send(getServerUptime()));

app.all("/api/events", validateTypeReqParams, eventsResponse);

app.all("*", (req, res) => res.status(404).send(pageNotFoundResponse));

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send(err);
});

fs.readFile("events.json", "utf8", (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    app.listen(port, () => {
        console.log(`Smarthouse API started on http://localhost:${port}`);
    });
});

function validateTypeReqParams(req, res, next) {
    const type = req.body.type || req.query.type;
    if (type) {
        const requestedTypes = type.split(":");
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
    const type = req.body.type || req.query.type;
    if (type) {
        const requestedTypes = type.split(":");
        const filteredEvents = db.events.filter(e => requestedTypes.includes(e.type));
        response = { events: [...filteredEvents] };
    }

    const reqLimit = req.body.limit || req.query.limit;
    const reqSkip = req.body.skip || req.query.skip;
    if (reqLimit || reqSkip) {
        const skip = reqSkip || 0;
        const limit = reqLimit || DEFAULT_LIMIT;
        response = { events: response.events.slice(+skip, +skip + +limit) };
    }

    res.send(response);
}