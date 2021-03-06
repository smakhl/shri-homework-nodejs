import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");
import { cctvGet, cctvSet, eventsResponse } from "./controllers";
import { getServerUptime } from "./helpers";
import { validateTypeReqParams } from "./middleware";

const pageNotFoundResponse = "<h1>Page not found</h1>";
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.all("/status", (req: express.Request, res: express.Response) => res.send(getServerUptime()));
app.all("/api/events", validateTypeReqParams, eventsResponse);
app.get("/api/cctv", cctvGet);
app.post("/api/cctv", cctvSet);
app.all("*", (req: express.Request, res: express.Response) => res.status(404).send(pageNotFoundResponse));

app.use((err: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
    process.stdout.write(err.stack);
    response.status(500).send(err);
});

app.listen(port, () => {
    process.stdout.write(`Smarthouse API started on http://localhost:${port}`);
});
