import BullQueue from "@bull/bull.queue";

export default abstract class Producer {
    private readonly queue: BullQueue;

    protected constructor(queue: BullQueue) {
        this.queue = queue;
    }

    protected addJob(name: string, data: any): void {
        this.queue.instance.add(name, data, {
            attempts: 3,
            backoff: { type: 'fixed', delay: 5000 }
        });
    }
}