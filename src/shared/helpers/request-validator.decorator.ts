import JoiRequestValidationError from "@shared/errors/joi-request-validation.error";
import { Request } from "express";
import { ObjectSchema } from "joi";

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

export default function RequestValidator(schema: ObjectSchema): IJoiDecorator {
    return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]): Promise<void> {
            const req: Request = args[0];
            const { error } = await schema.validate(req.body);

            if (error?.details) {
                throw new JoiRequestValidationError(error.details[0].message);
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}