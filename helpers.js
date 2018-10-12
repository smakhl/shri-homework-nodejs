
function getServerUptime() {
    const uptimeInSecs = Math.floor(process.uptime());
    const date = new Date(null);
    date.setSeconds(uptimeInSecs);
    return date.toISOString().substr(11, 8);
}

function getDistinctEvents(db) {
    return new Set(db.events.map(e => e.type));
}

module.exports = { getServerUptime, getDistinctEvents };