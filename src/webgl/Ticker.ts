import { Events } from "@webgl";

export default class Ticker {
    /* ======================
    * Properties
    ====================== */
    public delta: number;
    public elapsed: number;
    public events: Events;
    public last: number;


    /* ======================
    * Setup
    ====================== */
    constructor() {
        this.last = 0;
        this.elapsed = 0;
        this.delta = 16; // Assign number > 0 to prevent bugs

        this.events = new Events();
    }

    update(elapsed: number) {
        this.elapsed = elapsed
        this.delta = elapsed - this.last;
        this.last = elapsed;

        this.events.trigger('tick')
    }
}