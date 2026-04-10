import { Pane } from "tweakpane";

export default class Debug {
    public active = false;
    public instance?: Pane

    constructor() {
        this.active = window.location.hash === "#debug";
        if (this.active) {
            this.instance = new Pane({ expanded: true, title: "Debug Panel" });
        }
    }
}