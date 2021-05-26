import {getEmail, listEmails, listMailBoxes} from '../../../src/controllers/imap';
import {getMockReq, getMockRes} from '@jest-mock/express';

describe('IMAP Handler Tests', () => {

    const {res} = getMockRes();
    const imapClientConfiguration = {
        "host": "outlook.office365.com",
        "port": 993,
        "secure": true,
        "auth": {
            "user": "pieeyecandidate@outlook.com",
            "pass": "U2FsdGVkX1/sJ2zYCOtzHnskim2tEMsjnvFg1z8uG9w="
        }
    };

    it('List All Emails', async () => {
        const req = getMockReq({
            body: imapClientConfiguration
        });
        await listEmails(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Get a email with invalid uid', async () => {
        const req = getMockReq({
            body: imapClientConfiguration,
            params: {uid: -1},
        });
        await getEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('Get a email with valid uid', async () => {
        const req = getMockReq({
            body: imapClientConfiguration,
            params: {uid: 5},
        });
        await getEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('List mail boxes', async () => {
        const req = getMockReq({
            body: imapClientConfiguration,
            params: {uid: 5},
        });
        await listMailBoxes(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

});
