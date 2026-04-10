import * as THREE from 'three/webgpu';
import type { Experience } from "@webgl";
import type { FolderApi } from 'tweakpane';

const debugObject = {
    ambientColor: "#ffffff",
    ambientIntensity: 0.1,
    directionalColor: "#ffe0c6",
    directionalIntensity: 3,
    helpers: false,
};

export default class Lights {
    /* ======================
    * Properties
    ====================== */
    public ambient!: THREE.AmbientLight;
    private debugFolder?: FolderApi;
    private debugObject = debugObject;
    public directional!: THREE.DirectionalLight;
    private experience: Experience;



    /* ======================
    * Setup
    ====================== */
    constructor(experience: Experience) {
        this.experience = experience;
        this.setLights();
        
        if (this.experience.debug.active) this.debug();
    }



    /* ======================
    * Methods
    ====================== */
    private setLights() {
        // Ambient light
        this.ambient = new THREE.AmbientLight(this.debugObject.ambientColor, this.debugObject.ambientIntensity);
        this.experience.scene.add(this.ambient);

        // Directional light
        this.directional = new THREE.DirectionalLight(this.debugObject.directionalColor, this.debugObject.directionalIntensity);
        this.directional.position.set(-8.348, 6.087, 10);
        this.experience.scene.add(this.directional);
    }

    private debug() {
        this.debugFolder = this.experience.debug.instance?.addFolder({ title: "💡 Lights", expanded: false });
        
        const directionalLightHelper = new THREE.DirectionalLightHelper(this.directional);
        directionalLightHelper.visible = debugObject.helpers;
        this.experience.scene.add(directionalLightHelper);

        this.debugFolder?.addBinding(this.debugObject, "helpers")
            .on("change", (e) => directionalLightHelper.visible = e.value);
        this.debugFolder?.addBinding(this.debugObject, "ambientColor")
            .on('change', (e) => this.ambient.color = new THREE.Color(e.value));
        this.debugFolder?.addBinding(this.debugObject, "ambientIntensity", { min: 0, max: 10, step: 0.001 })
            .on('change', (e) => this.ambient.intensity = e.value);
        this.debugFolder?.addBinding(this.debugObject, "directionalColor")
            .on('change', (e) => this.directional.color = new THREE.Color(e.value));
        this.debugFolder?.addBinding(this.debugObject, "directionalIntensity", { min: 0, max: 10, step: 0.001 })
            .on('change', (e) => this.directional.intensity = e.value);
        this.debugFolder?.addBinding(this.directional.position, 'x', { min: -10, max: 10, step: 0.001 })
        this.debugFolder?.addBinding(this.directional.position, 'y', { min: -10, max: 10, step: 0.001 })
        this.debugFolder?.addBinding(this.directional.position, 'z', { min: -10, max: 10, step: 0.001 })
    }
}