export class RequestError {
    public constructor(
        public message: string,
        public statusCode: number = 500
    ) {
        this.message = message;
        this. statusCode = statusCode;
    }
}