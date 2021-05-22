class IMAPClientConfiguration {
    host: string;
    port: number;
    secure: boolean;
    auth: IMAPClientCredentials;

    constructor(host: string, port: number, secure: boolean, auth: IMAPClientCredentials) {
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.auth = auth;
    }
}
