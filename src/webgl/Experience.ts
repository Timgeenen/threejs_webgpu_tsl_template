import { Debug, Lights, Renderer, ResourceLoader, Ticker, View, Viewport } from "@webgl";
import { World } from "@world";
import * as THREE from "three/webgpu";

export default class Experience {
    /* ======================
    * Singleton pattern to allow for async renderer setup and no duplicate instancing
    * Private constructor to force using async await getInstance()
    ====================== */

    private constructor() {}
    
    public static async getInstance() {
        if (!Experience.instance) {
            Experience.instance = new Experience();
            await Experience.instance.initialize();
        }
        
        return Experience.instance;
    }



    /* ======================
    * Properties
    ====================== */
    public canvas!: HTMLCanvasElement;
    public debug!: Debug;
    private static instance: Experience;
    public resourceLoader!: ResourceLoader;
    public lights!: Lights;
    public renderer!: Renderer;
    public scene!: THREE.Scene;
    public ticker!: Ticker;
    public view!: View;
    public viewport!: Viewport;
    public world!: World;



    /* ======================
     * Setup
     ====================== */
    private async initialize() {
        const canvas = document.getElementById('webgl');
        if (!canvas) {
            throw new Error('[404] Could not find DOM element with { id: "webgl" }');
        }

        this.resourceLoader = new ResourceLoader();
        this.canvas = canvas as HTMLCanvasElement;
        this.viewport = new Viewport(this);
        this.scene = new THREE.Scene();
        this.view = new View(this);
        this.renderer = await Renderer.getInstance(this);
        this.ticker = new Ticker();
        this.debug = new Debug();
        this.lights = new Lights(this);
        this.world = new World(this);

        // this.renderer.start();
        this.ticker.events.on('tick', () => this.update())
    }

    public update() {
        this.view.update();
        this.renderer.update();
    }
}