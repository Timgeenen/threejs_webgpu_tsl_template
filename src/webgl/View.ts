import * as THREE from 'three/webgpu'
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Experience } from '@webgl';

export default class View {
    /* ======================
    * Properties
    ====================== */
    public camera: THREE.PerspectiveCamera;
    private controls!: OrbitControls;
    private experience: Experience;



    /* ======================
    * Setup
    ====================== */
    constructor(experience: Experience) {
        this.experience = experience;
        this.camera = new THREE.PerspectiveCamera(35, this.experience.viewport.width / this.experience.viewport.height, 0.1, 100)
        this.camera.position.set(6, 4, 8);

        this.experience.scene.add(this.camera);

        this.setOrbitControls();

        this.experience.viewport.events.on('resize', () => this.resize())
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.experience.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.camera.aspect = this.experience.viewport.width / this.experience.viewport.height;
        this.camera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}