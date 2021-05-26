>### PreRequisites
1. Install `Node.js` and `NPM` on your local machine
2. Have `serverless` installed. Use `npm install -g serverless`
3. Install dependencies by running `npm install`

>### Running locally
1. We can run our application locally by typing `npm start`. Please note that there is no need of serverless login, and it has been tested

>### Deploying code AWS
1. Configure your AWS secret & access key using command:
    ```shell
    serverless config credentials --provider aws --key <<YOU AWS KEY>> --secret <<YOUR AWS SECRET>>
    ```
2. If you are using restrictive user, please make sure that the user contains appropriate permissions. If not please refer to https://www.serverless.com/framework/docs/providers/aws/guide/credentials/ for more information.
   Otherwise, please use `IAMCredentials.json` in the repo to set up required policy.
3. Finally, run `npm run deploy` to deploy your code to AWS, and please note the URL aka endpoints that will be shown at the end. Using this URL we can access our API endpoints.
4. For example, in my case it was showing like ` https://osqigydg34.execute-api.us-east-1.amazonaws.com/dev/{proxy+}`, barring the proxy placeholder at the end `{proxy+}` this is the url that we should we use to connect to our deployed REST API

>### Removing our lambda from AWS
1. Simple run `npm run remove`

>### Password encryption over the wire
1. To the API we will get encrypted password, to be specific AES encrypted using encryption key `j7WM}xMj9w|hkdG`
2. So, please send encrypted password while doing postman testing.
3. For the sample account provided in the assignment, encrypted password will be `U2FsdGVkX1/sJ2zYCOtzHnskim2tEMsjnvFg1z8uG9w=`

>### Endpoints
###[https://ao9zm46qp0.execute-api.us-east-1.amazonaws.com/dev/mailBoxes](https://ao9zm46qp0.execute-api.us-east-1.amazonaws.com/dev/mailBoxes)
**Description**: List paths for an account i.e., inbox, spam, and trash
**Method Type**: POST  
**Request Body**:  
```json
{
   "host": "outlook.office365.com",
   "port": 993,
   "secure": true,
   "auth": {
      "user": "pieeyecandidate@outlook.com",
      "pass": "U2FsdGVkX1/sJ2zYCOtzHnskim2tEMsjnvFg1z8uG9w="
   }
}
```
**Response JSON**:
```json
[
   {
      "path": "Archive",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Archive",
      "subscribed": true
   },
   {
      "path": "Deleted",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Deleted",
      "specialUse": "\\Trash",
      "subscribed": true
   },
   {
      "path": "Drafts",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Drafts",
      "specialUse": "\\Drafts",
      "subscribed": true
   },
   {
      "path": "INBOX",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "specialUse": "\\Inbox",
      "parent": [],
      "name": "Inbox",
      "subscribed": true
   },
   {
      "path": "Junk",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Junk",
      "specialUse": "\\Junk",
      "subscribed": true
   },
   {
      "path": "Notes",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Notes",
      "subscribed": true
   },
   {
      "path": "Outbox",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Outbox",
      "subscribed": true
   },
   {
      "path": "Sent",
      "flags": {},
      "delimiter": "/",
      "listed": true,
      "parent": [],
      "name": "Sent",
      "specialUse": "\\Sent",
      "subscribed": true
   }
]
```
###[https://ao9zm46qp0.execute-api.us-east-1.amazonaws.com/dev/emails?path=INBOX](https://ao9zm46qp0.execute-api.us-east-1.amazonaws.com/dev/emails?path=INBOX)
**Description**: List emails
**Query parameter**: Path, if not provided we will default to `inbox`
**Method Type**: POST  
**Request Body**:
```json
{
   "host": "outlook.office365.com",
   "port": 993,
   "secure": true,
   "auth": {
      "user": "pieeyecandidate@outlook.com",
      "pass": "U2FsdGVkX1/sJ2zYCOtzHnskim2tEMsjnvFg1z8uG9w="
   }
}
```
**Response Body**:
```json
[
   {
      "seq": 8,
      "uid": 52,
      "envelope": {
         "date": "2021-05-24T13:12:17.000Z",
         "subject": "Testing plain text email",
         "from": [
            {
               "name": "Ambuj Kumar",
               "address": "itsambuja@gmail.com"
            }
         ],
         "to": [
            {
               "name": "",
               "address": "pieeyecandidate@outlook.com"
            }
         ],
         "messageId": "<CAGdM79OYMcDS00gqv=QM6Mrb5fD8Ku8JsXcMxgrxeJa5Sj2opA@mail.gmail.com>"
      },
      "internalDate": "2021-05-24T13:12:31.000Z",
      "id": "a3eac0e5f81f4bda218b9423d549d510"
   }
]
```

###[https://ao9zm46qp0.execute-api.us-east-1.amazonaws.com/dev/emails/52?path=INBOX](https://ao9zm46qp0.execute-api.us-east-1.amazonaws.com/dev/emails/52?path=INBOX)
**Description**: Get a particular email
**Query parameter**: Path, if not provided we will default to `inbox`
**Path variable**: Uid aka unique id
**Method Type**: POST  
**Request Body**:
```json
{
   "host": "outlook.office365.com",
   "port": 993,
   "secure": true,
   "auth": {
      "user": "pieeyecandidate@outlook.com",
      "pass": "U2FsdGVkX1/sJ2zYCOtzHnskim2tEMsjnvFg1z8uG9w="
   }
}
```
**Response Body**:
```json
{
   "envelope": {
      "date": "2021-05-24T13:12:17.000Z",
      "subject": "Testing plain text email",
      "from": [
         {
            "name": "Ambuj Kumar",
            "address": "itsambuja@gmail.com"
         }
      ],
      "to": [
         {
            "name": "",
            "address": "pieeyecandidate@outlook.com"
         }
      ],
      "messageId": "<CAGdM79OYMcDS00gqv=QM6Mrb5fD8Ku8JsXcMxgrxeJa5Sj2opA@mail.gmail.com>"
   },
   "text": "Hello, This email contains only text.\n",
   "html": "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\">Hello, This email contains only text.</div>\n",
   "attachments": []
}
```

>###Running tests
1. Simply run `npm test`

>###Below items were not implemented
1. Pagination is not implemented while listing all emails
2. Added test cases only for the controller handler file, as remaining files were the configurations more or less. If we need to test configurations also, we might need to consider `postman` framework.
