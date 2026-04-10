import * as THREE from 'three/webgpu'
import type { Experience } from '@webgl';

export default class Renderer {
    /* ======================
    * Singleton pattern to make sure the renderer can be initialized async
    ====================== */
    private constructor(experience: Experience) {
        this.experience = experience;
    }

    
    public static async getInstance(experience: Experience) {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer(experience);
            await Renderer.instance.initialize();
        }
        
        return Renderer.instance;
    }



    /* ======================
    * Properties
    ====================== */
    public experience: Experience;
    private static instance: Renderer;
    public renderer!: THREE.WebGPURenderer;



    /* ======================
     * Setup
     ====================== */
    private async initialize() {
        this.renderer = new THREE.WebGPURenderer({
            canvas: this.experience.canvas,
            powerPreference: 'high-performance',
            forceWebGL: false,
            antialias: this.experience.viewport.pixelRatio < 2
        });

        this.renderer.setSize(this.experience.viewport.width, this.experience.viewport.height)
        this.renderer.setPixelRatio(this.experience.viewport.pixelRatio);
        this.renderer.setClearColor('#0a0a0a');
        this.renderer.setAnimationLoop((elapsedTime) => { this.experience.ticker.update(elapsedTime) })

        await this.renderer.init();

        this.experience.viewport.events.on('resize', () => this.resize())
    }



    /* ======================
    * Methods
    ====================== */
    // public start() {
    //     this.experience.ticker.events.on('tick', () => this.update())
    // }

    public resize() {
        this.renderer.setSize(this.experience.viewport.width, this.experience.viewport.height);
        this.renderer.setPixelRatio(this.experience.viewport.pixelRatio);
    }

    public update() {
        this.renderer.render(this.experience.scene, this.experience.view.camera)
    }
}