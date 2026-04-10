import { Events, type Experience } from "@webgl";

export default class Viewport
{
    events: Events;
    experience: Experience;
    width!: number;
    height!: number;
    ratio!: number;
    devicePixelRatio!: number;
    pixelRatioMax!: number;
    pixelRatio!: number;

    constructor(experience: Experience)
    {        
        this.experience = experience;

        this.events = new Events();

        this.measure();
        this.setResize();
    }

    measure()
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ratio = this.width / this.height;

        this.devicePixelRatio = window.devicePixelRatio;
        this.pixelRatioMax = 2;
        this.pixelRatio = Math.min(this.devicePixelRatio, this.pixelRatioMax);
    }

    setResize()
    {
        const throttleDuration = 400;
        let throttleTimeout: number | null = null;
        addEventListener('resize', () =>
        {
            this.measure();

            if(throttleTimeout)
            {
                clearTimeout(throttleTimeout);
            }

            throttleTimeout = setTimeout(() =>
            {
                throttleTimeout = null;
                this.events.trigger('resize');
            }, throttleDuration);
        });
    }
}