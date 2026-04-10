import * as THREE from 'three/webgpu'

export default class ResourceLoader {
    // private loaders: Map<string, THREE.Loader>;
    public resources: Map<string, THREE.Texture>;

    constructor() {
        // this.loaders = new Map();
        this.resources = new Map();
        const textureLoader = new THREE.TextureLoader();
    }
}