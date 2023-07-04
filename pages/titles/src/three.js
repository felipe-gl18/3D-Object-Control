import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class threeSphere {
    #model
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
        this.renderer = new THREE.WebGLRenderer();
        this.loader = new GLTFLoader()
    }

    sphere() {
        this.renderer.setSize(window.innerWidth / 1.4, window.innerHeight / 1.7)
        document.querySelector("#objectModel").appendChild(
            this.renderer.domElement
        )

        this.loader.load('../lib/shiba/scene.gltf', (gltf) => {
            console.log(gltf.scene);
            this.#model = gltf.scene
            this.scene.add(gltf.scene)
            this.renderer.render(this.scene, this.camera)
        })

        this.scene.background = new THREE.Color(0x333333)
        //const geometry = new THREE.SphereGeometry(7.5, 16, 16);
        //const material = new THREE.MeshBasicMaterial({ color: 0xfff000 });
        //this.#sphere = new THREE.Mesh(geometry, material);

        this.camera.position.z = 2

    }

    animateSphere(x) {
        console.log(x);
        if (x.handedness == "Right") {
            x.event.includes('zooming-out') ? this.camera.position.z += 1 : this.camera.position.z -= 1
        }
        if (x.handedness == "Left") {
            if (typeof x.movement !== 'undefined') {
                x.movement.includes("right") ? this.#model.rotation.y += 0.25 : this.#model.rotation.y -= 0.25
            }
        }
        this.renderer.render(this.scene, this.camera)
    }

}
