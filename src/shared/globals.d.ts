export {};

declare global {
    namespace Express {
        interface Request {
            currentUser?: any;
            jwt?: any;
        }
    }
}