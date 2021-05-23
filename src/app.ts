import * as express from "express";
import * as imapController from "./controllers/imap";
import * as asyncHandler from "express-async-handler";
import * as bodyParser from "body-parser"

const app = express();

app.use(((err, req, res, next) => {
    return res.status(500).json({
        message: "Internal Server Error",
    });
}) as express.ErrorRequestHandler);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/emails", asyncHandler(imapController.listEmails));

app.post("/emails/:uid", asyncHandler(imapController.getEmail));

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Not Found",
    });
});

export {app};
