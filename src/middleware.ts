import express from "express";
const TYPES = ["info", "critical"];

export function validateTypeReqParams(req: express.Request, res: express.Response, next: express.NextFunction) {
    const reqType: string = req.body.type || req.query.type;
    if (reqType) {
        const requestedTypes = reqType.split(":");
        requestedTypes.forEach((type) => {
            if (!TYPES.includes(type)) {
                res.status(400).send("Incorrect type");
                return next("Incorrect type caught in middleware: " + type);
            }
        });
    }
    next();
}
