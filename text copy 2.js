import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from './three.js/examples/jsm/loaders/GLTFLoader.js'
import {TextGeometry} from "./three.js/examples/jsm/geometries/TextGeometry.js"
import {FontLoader} from "./three.js/examples/jsm/loaders/FontLoader.js"

let scene, camera, renderer, controls
let loader = new GLTFLoader()
let activeCamera = "cam1";

const initCam1 = () => {
    scene = new THREE.Scene()
    
    let w = window.innerWidth
    let h = window.innerHeight
    camera = new THREE.PerspectiveCamera(45, w/h)
    camera.position.set(0,15,55)
    camera.lookAt(0,7,0)
}

const initCam2 = () => {
    let w = window.innerWidth
    let h = window.innerHeight
    camera = new THREE.PerspectiveCamera(45, w/h)
    camera.position.set(-55,15,0)
    camera.lookAt(0,15,0)
}

const initRenderer = () =>{
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.antialiasing = true
    renderer.setClearColor("lightblue")
    document.body.appendChild(renderer.domElement);
}

const switchCamera = () => {
    if (activeCamera == "cam2") {
        initCam2();
        activeCamera = "cam1";
    } else {
        initCam1();
        activeCamera = "cam2";
    }
};

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() == "c") {
        switchCamera();
        
    }
});

const pointfunc = () =>{

let geometry = new THREE.PlaneBufferGeometry(100,75)
let loader = new THREE.TextureLoader()
let texture = loader.load("./img/green-grass-field-background-soccer-football-sports-lawn-pattern-texture-close-up-image-142564163.jpg")
let material = new THREE.MeshStandardMaterial({
    map:texture
})
let mesh = new THREE.Mesh(geometry,material)
mesh.receiveShadow = true
mesh.rotateX(-Math.PI/2)
mesh.position.set(0,0,-7.5)
scene.add(mesh)

}

const loaderZombie = () =>{
    loader.load("./Assets/zombie/scene.gltf", function (GLTF) {
        let zombie = GLTF.scene
        zombie.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        zombie.scale.set(60, 60, 60)
        zombie.position.set(10, 0, 0)
        zombie.rotateY(-Math.PI/4)
        zombie.castShadow = true
        scene.add(zombie)
    })
}

const addPlantsNoZombie = () => {
    const loader = new FontLoader();
    loader.load("./three.js/examples/fonts/gentilis_bold.typeface.json",
        (font) => {
            const textGeometry = new TextGeometry("Plants NO Zombies", {
                font: font,
                size: 10,
                height: 2
            })

            const textMaterial = new THREE.MeshPhongMaterial({
                color: "#CCB7B6"
            })

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(-55, 20, -50);
            scene.add(textMesh);
        }
    )
}

let light = () =>{
    let light = new THREE.AmbientLight('#FFFFFC')
    light.position.set(0,0,0)
    light.intensity = 0.5
    light.castShadow = false
  
    scene.add(light)

}

let spotlight = () =>{
    let light = new THREE.SpotLight('#FFFFFF')
    light.position.set(-80, 40, 0)
    light.intensity = 1.2, 0.5
    light.castShadow = true

    scene.add(light)

}

const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene,camera)
}


window.onload = () => {
    initCam1()
    initCam2()
    initRenderer()
    switchCamera()
    pointfunc()
    loaderZombie()
    addPlantsNoZombie();
    light()
    spotlight()
    render()
}

window.onresize = () => {
    let w = window.innerWidth
    let h = window.innerHeight
    renderer.setSize(w,h)
    camera.aspect = w/h
    camera.updateProjectionMatrix()
}