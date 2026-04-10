import type { Experience } from "@webgl";
import * as THREE from 'three/webgpu';

export default class Earth {
    /* ======================
    * Properties
    ====================== */
    private experience: Experience;
    public geometry: THREE.SphereGeometry;
    public material: THREE.MeshStandardNodeMaterial;
    public mesh: THREE.Mesh;



    /* ======================
    * Setup
    ====================== */
    constructor(experience: Experience) {
        this.experience = experience;
        this.geometry = new THREE.SphereGeometry(2, 32, 32);
        this.material = new THREE.MeshStandardNodeMaterial();

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.experience.scene.add(this.mesh)
    }



    /* ======================
    * Methods
    ====================== */
    update() {
    }
}
