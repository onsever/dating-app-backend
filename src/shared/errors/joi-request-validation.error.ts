import CustomError from "@shared/errors/custom.error";
import HTTP_STATUS from "http-status-codes";

export default class JoiRequestValidationError extends CustomError {
    public statusCode: number = HTTP_STATUS.BAD_REQUEST;
    public status: string = 'error';

    constructor(message: string) {
        super(message);
    }
}