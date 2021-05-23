>### PreRequisites
1. Install `Node.js` and `NPM` on your local machine
2. Have `serverless` installed. Use `npm install -g serverless`

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

>### Endpoints
###[https://me1x6y8d12.execute-api.us-east-1.amazonaws.com/dev/emails](https://me1x6y8d12.execute-api.us-east-1.amazonaws.com/dev/emails)
**Description**: Get all emails  
**Method Type**: POST  
**Request Body**:  
```json
{
    "host": "outlook.office365.com",
    "port": 993,
    "secure": true,
    "auth": {
        "user":"pieeyecandidate@outlook.com",
        "pass":"2021-codder#"
    }
}
```
**Response JSON**:
```json
[
    {
        "seq": 1,
        "envelope": {
            "date": "2021-05-04T19:10:27.000Z",
            "subject": "Welcome to your new Outlook.com account",
            "from": [
                {
                    "name": "Outlook Team",
                    "address": "no-reply@microsoft.com"
                }
            ],
            "to": [
                {
                    "name": "PieEye Candidate",
                    "address": "pieeyecandidate@outlook.com"
                }
            ],
            "messageId": "<BY5PR11MB388009AB17B7A2BE8253E654AC5A9@BY5PR11MB3880.namprd11.prod.outlook.com>"
        },
        "internalDate": "2021-05-04T19:10:27.000Z",
        "uid": 5,
        "id": "a3e507a857a3ed3e496b2ee95045d2aa"
    }
]
```
###[ https://me1x6y8d12.execute-api.us-east-1.amazonaws.com/dev/emails/10]( https://me1x6y8d12.execute-api.us-east-1.amazonaws.com/dev/emails/10)
**Description**: Get single email  
**Path Variable**: Email UID  
**Method Type**: POST  
**Request Body**:
```json
{
    "host": "outlook.office365.com",
    "port": 993,
    "secure": true,
    "auth": {
        "user":"pieeyecandidate@outlook.com",
        "pass":"2021-codder#"
    }
}
```
**Response Body**:
```json
{
    "seq": 2,
    "uid": 10,
    "flags": {},
    "bodyStructure": {
        "childNodes": [
            {
                "part": "1",
                "type": "text/plain",
                "parameters": {
                    "charset": "utf-8"
                },
                "encoding": "7bit",
                "size": 552,
                "lineCount": 13
            },
            {
                "part": "2",
                "type": "text/html",
                "parameters": {
                    "charset": "utf-8"
                },
                "encoding": "7bit",
                "size": 3520,
                "lineCount": 34
            }
        ],
        "type": "multipart/alternative",
        "parameters": {
            "boundary": "=-WEbof0BqeYqLLExp7Jhwng=="
        }
    },
    "envelope": {
        "date": "2021-05-04T19:12:49.000Z",
        "subject": "Microsoft account security info was added",
        "from": [
            {
                "name": "Microsoft account team",
                "address": "account-security-noreply@accountprotection.microsoft.com"
            }
        ],
        "to": [
            {
                "name": "",
                "address": "pieeyecandidate@outlook.com"
            }
        ],
        "messageId": "<51BU58V6NDU4.K35W6IE4JLNV@BL02EPF00001955>"
    },
    "internalDate": "2021-05-04T19:12:52.000Z",
    "headers": {
        "type": "Buffer",
        "data": []
    },
    "id": "242e8c13c9fa3c2b57a2b485329039b1"
}
```

