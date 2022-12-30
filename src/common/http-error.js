export class HttpError extends Error {
    constructor(response) {
        super("HTTP error occured!");
        this.response = response;
    }
}
