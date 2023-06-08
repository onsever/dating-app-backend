import CustomError from "@shared/errors/custom.error";
import HTTP_STATUS from "http-status-codes";

export default class UnauthorizedError extends CustomError {
    public statusCode: number = HTTP_STATUS.UNAUTHORIZED;
    public status: string = 'error';

    constructor(message: string) {
        super(message);
    }
}