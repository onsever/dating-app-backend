import IError from "@interfaces/error.interface";

export default abstract class CustomError extends Error {
    public abstract statusCode: number;
    public abstract status: string;

    protected constructor(message: string) {
        super(message);
    }

    public serializeErrors(): IError {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status
        };
    }
}