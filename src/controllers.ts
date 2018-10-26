import express from "express";
import { getEvents } from "./helpers";
const DEFAULT_LIMIT = 30;

export async function eventsResponse(req: express.Request, res: express.Response) {
    let response: ApiResponse = {};
    const eventsJson = await getEvents();
    const type: string = req.body.type || req.query.type;
    if (type !== undefined) {
        const requestedTypes = type.split(":");
        const filteredEvents = eventsJson.events ?
            eventsJson.events.filter((e: SmartHomeEvent) => requestedTypes.includes(e.type)) :
            [];
        response.events = [...filteredEvents];
    } else {
        response.events = eventsJson.events;
    }

    const reqLimit = req.body.limit || req.query.limit;
    const reqSkip = req.body.skip || req.query.skip;
    if (reqLimit || reqSkip) {
        const skip = reqSkip || 0;
        const limit = reqLimit || DEFAULT_LIMIT;
        response = { events: response.events ? response.events.slice(+skip, +skip + +limit) : [] };
    }

    res.send(response);
}
