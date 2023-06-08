import Queue, { Job } from "bull";
import Logger from "@configurations/logger";
import Config from "@configurations/config";
import BullBoard from "@bull/bull.board";

export default abstract class BullQueue {
    private readonly queue: Queue.Queue;
    private readonly logger: Logger;
    private readonly bullBoard: BullBoard;

    protected constructor(name: string) {
        this.logger = new Logger(`${name}Queue`);
        this.queue = new Queue(name, `${Config.getInstance().REDIS_HOST}`);
        this.setupListeners();
        this.bullBoard = BullBoard.getInstance(this.queue);
    }

    private setupListeners(): void {
        this.queue.on('completed', (job: Job) => {
            job.remove().then(() => {
                this.logger.info(`Job ${job.id} completed.`);
            }).catch((error: unknown) => {
                this.logger.error(`Error removing job ${job.id}: ${error}`);
            });
        });

        this.queue.on('global:completed', (jobId: string) => {
            this.logger.info(`Job ${jobId} completed.`);
        });

        this.queue.on('global:stalled', (jobId: string) => {
            this.logger.info(`Job ${jobId} is stalled.`);
        });
    }

    public get instance(): Queue.Queue {
        return this.queue;
    }
}
