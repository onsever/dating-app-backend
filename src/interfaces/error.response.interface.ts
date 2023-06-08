import IError from "@interfaces/error.interface";

export default interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    serializeErrors(): IError;
}