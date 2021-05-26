import {Request, Response} from 'express';
import {ImapFlow} from 'imapflow'
import {simpleParser} from 'mailparser';

const imapQueryOptionsWhenGetOne = {
    envelope: true,
    source: true,
};

const imapQueryOptionsWhenGetAll = {
    envelope: true,
    internalDate: true,
    uid: true,
};

const defaultPath = 'INBOX';

export const listEmails = async (req: Request, res: Response) => {
    const imapClientConfiguration = req.body as IMAPClientConfiguration;
    const path = req.query.path ? req.query.path : defaultPath;
    const client = new ImapFlow(imapClientConfiguration);
    await client.connect();
    const lock = await client.getMailboxLock(path);
    try {
        let messages = [];
        for await (let message of client.fetch('1:*', imapQueryOptionsWhenGetAll)) {
            messages.push(message);
        }
        res.status(200).send(toString(messages));
    } finally {
        lock.release();
        await client.logout();
        client.clearSocketHandlers();
    }
}

export const getEmail = async (req: Request, res: Response) => {
    const uid = req.params.uid as string;
    const path = req.query.path ? req.query.path : defaultPath;
    const imapClientConfiguration = req.body as IMAPClientConfiguration;
    const client = new ImapFlow(imapClientConfiguration);
    await client.connect();
    const lock = await client.getMailboxLock(path);
    try {
        let mail = await client.fetchOne(uid, imapQueryOptionsWhenGetOne, {uid: true});
        if (mail == false) {
            res.status(404).send();
            return;
        }
        let messageData = await simpleParser(mail.source, {})
        res.status(200).send(toString({
            envelope: mail.envelope,
            text: messageData.text,
            html: messageData.html ? messageData.html : messageData.textAsHtml,
            attachments: messageData.attachments
        }));

    } finally {
        lock.release();
        await client.logout();
        client.clearSocketHandlers();
    }
}

export const listMailBoxes = async (req: Request, res: Response) => {
    const imapClientConfiguration = req.body as IMAPClientConfiguration;
    const client = new ImapFlow(imapClientConfiguration);
    await client.connect();
    try {
        let folders = await client.list();
        res.status(200).send(toString(folders));
    } finally {
        await client.logout();
        client.clearSocketHandlers();
    }
}

const toString = (data: any) => {
    return JSON.stringify(data, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
    );
}
