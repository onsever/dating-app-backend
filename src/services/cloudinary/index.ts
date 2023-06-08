import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import Config from "@configurations/config";

export default class Cloudinary {
    private static INSTANCE: Cloudinary;
    private readonly config: Config;

    private constructor() {
        this.config = Config.getInstance();
        this.cloudinaryConfig();
    }

    public static getInstance(): Cloudinary {
        if (!Cloudinary.INSTANCE) {
            Cloudinary.INSTANCE = new Cloudinary();
        }

        return Cloudinary.INSTANCE;
    }

    private cloudinaryConfig(): void {
        cloudinary.v2.config({
            cloud_name: this.config.CLOUD_NAME,
            api_key: this.config.CLOUD_API_KEY,
            api_secret: this.config.CLOUD_API_SECRET
        });
    }

    public uploadImage(
        file: string,
        public_id?: string,
        overwrite?: boolean,
        invalidate?: boolean
    ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
        return new Promise((resolve) => {
            cloudinary.v2.uploader.upload(
                file,
                {
                    public_id: public_id,
                    overwrite: overwrite,
                    invalidate: invalidate
                },
                (error: UploadApiErrorResponse | undefined, callResult: UploadApiResponse | undefined) => {
                    if (error) resolve(error);
                    resolve(callResult);
                }
            );
        });
    }
}