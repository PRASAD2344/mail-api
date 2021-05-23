import {Request, Response} from 'express';
import {ImapFlow} from 'imapflow'

const imapQueryOptionsWhenGetOne = {
    uid: true,
    flags: true,
    bodyStructure: true,
    envelope: true,
    internalDate: true,
    emailId: true,
    threadId: true,
    xGmLabels: true,
    headers: ['date', 'subject']
};

const imapQueryOptionsWhenGetAll = {
    envelope: true,
    internalDate: true
};

export const listEmails = async (req: Request, res: Response) => {
    const imapClientConfiguration = req.body as IMAPClientConfiguration;
    const client = new ImapFlow(imapClientConfiguration);
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    try {
        let messages = [];
        for await (let message of client.fetch('1:*', imapQueryOptionsWhenGetAll)) {
            messages.push(message);
        }
        res.status(200).send(toString(messages));
    } finally {
        lock.release();
        await client.logout();
    }
}

export const getEmail = async (req: Request, res: Response) => {
    const uid = req.params.uid as string;
    const imapClientConfiguration = req.body as IMAPClientConfiguration;
    const client = new ImapFlow(imapClientConfiguration);
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    try {
        let message = await client.fetchOne(uid, imapQueryOptionsWhenGetOne, {uid: true});
        if (message == false) {
            res.status(404).send();
        } else {
            res.status(200).send(toString(message));
        }
    } finally {
        lock.release();
        await client.logout();
    }
}

const toString = (data: any) => {
    return JSON.stringify(data, (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value
    );
}
