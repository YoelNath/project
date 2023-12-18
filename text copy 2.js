import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from "./three.js/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "./three.js/examples/jsm/loaders/FontLoader.js";

let scene, camera, renderer, controls;
let loader = new GLTFLoader();
let activeCamera = "cam1";
let day, night;
let light, spotlight; // Declare light sources globally

const initCam1 = () => {
    scene = new THREE.Scene();

    let w = window.innerWidth;
    let h = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, w / h);
    camera.position.set(0, 15, 55);
    camera.lookAt(0, 7, 0);
};

const initCam2 = () => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, w / h);
    camera.position.set(-55, 15, 0);
    camera.lookAt(0, 15, 0);
};

const initRenderer = () => {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.antialiasing = true;
    renderer.setClearColor("lightblue");
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 50, 0);
};

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

    if (event.code == "Space") {
        // Toggle between day and night
        if (spotlight.intensity == 1.2) {
            spotlight.intensity = 0.5;
            scene.background = night;
        } else {
            spotlight.intensity = 1.2;
            scene.background = day;
        }
    }
});

const pointfunc = () => {
    let geometry = new THREE.PlaneBufferGeometry(100, 75);
    let loader = new THREE.TextureLoader();
    let texture = loader.load("./img/green-grass-field-background-soccer-football-sports-lawn-pattern-texture-close-up-image-142564163.jpg");
    let material = new THREE.MeshStandardMaterial({
        map: texture
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.rotateX(-Math.PI / 2);
    mesh.position.set(0, 0, -7.5);
    scene.add(mesh);
};

const addPeashooter = () => {
  
    const headGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const headMaterial = new THREE.MeshPhongMaterial({ color: '#52D017', shininess: 30 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(-30, 10, 0);
    head.castShadow = true;
    scene.add(head);


    const mouthGeometry = new THREE.CylinderGeometry(0.5, 1, 2.5, 64, 64, true);
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: '#52D017', shininess: 30 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(-26.5, 10, 0);
    mouth.rotation.z = Math.PI / 2; 
    mouth.castShadow = true;
    scene.add(mouth);


    const headTopGeometry = new THREE.ConeGeometry(1, 2.5, 64);
    const headTopMaterial = new THREE.MeshPhongMaterial({ color: '#43B000', shininess: 30 });
    const headTop = new THREE.Mesh(headTopGeometry, headTopMaterial);
    headTop.position.set(-32.5, 12, 0);
    headTop.rotation.z = Math.PI / 4;
    headTop.castShadow = true;
    scene.add(headTop);

 
    const eyeGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: '#000000' });

    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(-28.5, 11, -1.5);
    eye1.castShadow = true;
    scene.add(eye1);

    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(-28.5, 11, 1.5);
    eye2.castShadow = true;
    scene.add(eye2);


    const trunkGeometry = new THREE.CylinderGeometry(0.75, 0.75, 10, 64, 64, true);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: '#4BBF15', shininess: 30 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(-30, 5, 0);
    trunk.castShadow = true;
    scene.add(trunk);
};

const loaderZombie = () => {
    loader.load("./Assets/zombie/scene.gltf", function (GLTF) {
        let zombie = GLTF.scene;
        zombie.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        zombie.scale.set(60, 60, 60);
        zombie.position.set(10, 0, 0);
        zombie.rotateY(-Math.PI / 4);
        zombie.castShadow = true;
        scene.add(zombie);
    });
};

const loaderFence = () => {
    loader.load("./Assets/fence/scene.gltf", function (GLTF) {
        let fence = GLTF.scene;
        fence.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        fence.scale.set(10, 10, 10);
        fence.position.set(-40, 8.5, -44);
        fence.castShadow = true;
        scene.add(fence);
    });

    loader.load("./Assets/fence/scene.gltf", function (GLTF) {
        let fence1 = GLTF.scene;
        fence1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        fence1.scale.set(10, 10, 10);
        fence1.position.set(-20, 8.5, -44);
        fence1.castShadow = true;
        scene.add(fence1);
    });

    loader.load("./Assets/fence/scene.gltf", function (GLTF) {
        let fence2 = GLTF.scene;
        fence2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        fence2.scale.set(10, 10, 10);
        fence2.position.set(0, 8.5, -44);
        fence2.castShadow = true;
        scene.add(fence2);
    });

    loader.load("./Assets/fence/scene.gltf", function (GLTF) {
        let fence3 = GLTF.scene;
        fence3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        fence3.scale.set(10, 10, 10);
        fence3.position.set(20, 8.5, -44);
        fence3.castShadow = true;
        scene.add(fence3);
    });

    loader.load("./Assets/fence/scene.gltf", function (GLTF) {
        let fence4 = GLTF.scene;
        fence4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        fence4.scale.set(10, 10, 10);
        fence4.position.set(40, 8.5, -44);
        fence4.castShadow = true;
        scene.add(fence4);
    });

};

const addPlantsNoZombie = () => {
    const loader = new FontLoader();
    loader.load("./three.js/examples/fonts/gentilis_bold.typeface.json",
        (font) => {
            const textGeometry = new TextGeometry("Plants NO Zombies", {
                font: font,
                size: 10,
                height: 2
            });

            const textMaterial = new THREE.MeshPhongMaterial({
                color: "#CCB7B6"
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(-55, 20, -50);
            scene.add(textMesh);
        }
    );
};


const initSky = () => {
    day = new THREE.CubeTextureLoader()
        .load([
            "./Assets/cloudy/bluecloud_ft.jpg",
            "./Assets/cloudy/bluecloud_bk.jpg",
            "./Assets/cloudy/bluecloud_up.jpg",
            "./Assets/cloudy/bluecloud_dn.jpg",
            "./Assets/cloudy/bluecloud_rt.jpg",
            "./Assets/cloudy/bluecloud_lf.jpg"
        ]);

    night = new THREE.CubeTextureLoader()
        .load([
            "./Assets/nightskycolor.png",
            "./Assets/nightskycolor.png",
            "./Assets/nightskycolor.png",
            "./Assets/nightskycolor.png",
            "./Assets/nightskycolor.png",
            "./Assets/nightskycolor.png"
        ]);

    scene.background = day;
};

const walnut =() =>{
    const walnutGeometry = new THREE.CylinderGeometry(4.5, 4.5, 3, 64, 64, true);
    const texture = loader.load("./img/green-grass-field-background-soccer-football-sports-lawn-pattern-texture-close-up-image-142564163.jpg");
    
    const walnutMaterial = new THREE.MeshPhongMaterial({ color: '#4BBF15', map: texture });
    
    const walnut = new THREE.Mesh(walnutGeometry, walnutMaterial);
    walnut.position.set(-17.5, 4.5, 0);
    walnut.rotation.z = Math.PI / 2;
    walnut.castShadow = true;
    
    scene.add(walnut);
 
}

light = () => {

    light = new THREE.AmbientLight('#FFFFFC');
    light.position.set(0, 0, 0);
    light.intensity = 0.5;
    light.castShadow = false;

    scene.add(light);
};

spotlight = () => {

    spotlight = new THREE.SpotLight('#FFFFFF');
    spotlight.position.set(-80, 40, 0);
    spotlight.intensity = 1.2;
    spotlight.castShadow = true;

    scene.add(spotlight);
};

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};

window.onload = () => {
    initCam1();
    initCam2();
    initRenderer();
    switchCamera();
    pointfunc();
    loaderZombie();
    loaderFence();
    addPlantsNoZombie();
    walnut();
    addPeashooter();
    initSky();
    light();
    spotlight();
    render();


};

window.onresize = () => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
};
