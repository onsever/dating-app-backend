import {ExpressAdapter} from "@bull-board/express";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { createBullBoard } from '@bull-board/api';
import Queue from "bull";


export default class BullBoard {
    private static INSTANCE: BullBoard;
    private readonly bullAdapters: BullAdapter[] = [];
    private readonly expressAdapter: ExpressAdapter;

    private constructor(queue?: Queue.Queue) {
        if (queue) {
            this.bullAdapters.push(new BullAdapter(queue));
        }
        this.expressAdapter = new ExpressAdapter();
        this.expressAdapter.setBasePath('/queues');
        createBullBoard({
            queues: this.bullAdapters,
            serverAdapter: this.expressAdapter
        });
    }

    public static getInstance(queue?: Queue.Queue): BullBoard {
        if (!BullBoard.INSTANCE) {
            BullBoard.INSTANCE = new BullBoard(queue);
        }
        return BullBoard.INSTANCE;
    }

    public getExpressAdapter(): ExpressAdapter {
        return this.expressAdapter;
    }
}