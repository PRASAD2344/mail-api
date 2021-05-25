import * as express from "express";
import * as imapController from "./controllers/imap";
import * as asyncHandler from "express-async-handler";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {listMailBoxes} from "./controllers/imap";

const app = express();
const allowedOrigins = ['http://localhost:4200'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(options));

app.post("/emails", asyncHandler(imapController.listEmails));

app.post("/emails/:uid", asyncHandler(imapController.getEmail));

app.post("/mailBoxes", asyncHandler(imapController.listMailBoxes));

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Not Found",
    });
});

app.use(((err, req, res, next) => {
    return res.status(500).json({
        message: "Internal Server Error",
    });
}) as express.ErrorRequestHandler);

export {app};
