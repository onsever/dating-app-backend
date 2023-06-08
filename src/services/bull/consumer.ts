import Queue from "bull";
import BullQueue from "@bull/bull.queue";

export default abstract class Consumer {
    private readonly queue: BullQueue;

    protected constructor(queue: BullQueue) {
        this.queue = queue;
    }

    protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
        this.queue.instance.process(name, concurrency, callback);
    }
}