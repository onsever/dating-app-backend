import CustomError from "@shared/errors/custom.error";
import HTTP_STATUS from "http-status-codes";

export default class FileTooLargeError extends CustomError {
    public statusCode: number = HTTP_STATUS.REQUEST_TOO_LONG;
    public status: string = 'error';

    constructor(message: string) {
        super(message);
    }
}