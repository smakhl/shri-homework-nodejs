import fs from "fs";

export function getServerUptime() {
    const uptimeInSecs = Math.floor(process.uptime());
    const date = new Date(0);
    date.setSeconds(uptimeInSecs);
    return date.toISOString().substr(11, 8);
}

export function getEvents() {
    return new Promise<ApiResponse>((resolve, reject) => {
        fs.readFile(`events.json`, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}
