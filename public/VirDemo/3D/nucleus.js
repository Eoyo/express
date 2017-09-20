/**
 * use THREE.js dat.gui.js to create nucleus like animation;
 */

function Opts() {
    this.itemRadius = 10;
    this.curvesLength = 10;
    this.itemQuantity = 45;
    this.noiseForce = 0.5;
    this.noiseRatio = 0.15;
    this.maxSpeed = 0.15;
    this.colorRange = 60;
    this.colorOffset = 150;
    this.itemsScaleRange = 0.5;
    this.pathOpacity = 0;
    this.heartRadius = 100;
    this.atomsQuantity = 150;
    this.atomsScale = 6;
    this.atomsSpeed = 4;
}


var options = new Opts();
var gui = new dat.GUI();
function initScene() {
    //Reset scene
    for (var i = scene.children.length - 1; i >= 0; i--) {
        scene.remove(scene.children[i]);
    }

    //Lights
    scene.add(pointLight);
    scene.add(light);

    necks = [];
    cubesObject = new THREE.Object3D();
    scene.add(cubesObject);
    //Generate n path with cubes
    for (var i = 0; i < options.curvesLength; i++) {
        var index = i / options.curvesLength;
        var neck = new Necklace(index);
        cubesObject.add(neck.object);
        necks.push(neck);
    }

    //Create the heart
    initHeart();
}
gui.add(options, 'atomsSpeed', 0, 10).onChange(initScene);

var heartOptions = gui.addFolder('Heart');
heartOptions.add(options, 'heartRadius', 10, 250).step(1).onChange(initScene);
heartOptions.add(options, 'atomsQuantity', 1, 500).step(1).onChange(initScene);
heartOptions.add(options, 'atomsScale', 1, 20).step(1).onChange(initScene);

var oldOptions = gui.addFolder('Moons');
oldOptions.add(options, 'itemRadius', 1, 100).step(1).onChange(initScene);
oldOptions.add(options, 'itemQuantity', 1, 100).step(1).onChange(initScene);
oldOptions.add(options, 'curvesLength', 1, 50).step(1).onChange(initScene);
oldOptions.add(options, 'noiseRatio', 0, 1).onChange(initScene);
oldOptions.add(options, 'noiseForce', 0, 1).onChange(initScene);
oldOptions.add(options, 'maxSpeed', 0.1, 1).onChange(initScene);
oldOptions.add(options, 'colorRange', 0, 360).step(1).onChange(initScene);
oldOptions.add(options, 'colorOffset', 0, 360).step(1).onChange(initScene);
oldOptions.add(options, 'itemsScaleRange', 0, 1).onChange(initScene);
oldOptions.add(options, 'pathOpacity', 0, 1).onChange(initScene);

var ww = window.innerWidth,
    wh = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas")
});
renderer.setClearColor(0x000000);
renderer.setSize(ww, wh);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50, ww / wh, 1, 5000);
camera.position.set(0, 0, 900);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.noKeys = true;

function Necklace(index) {
    var points = [];
    var lengthPathPoints = 40;
    noise.seed(index);
    for (var i = 0; i < lengthPathPoints; i++) {
        var x = Math.cos(i / lengthPathPoints * Math.PI * 2) * 350;
        var y = Math.sin(i / lengthPathPoints * Math.PI * 2) * 350;
        var z = 0;
        var random = noise.simplex2(x * options.noiseRatio * 0.01, y * options.noiseRatio * 0.01) * options.noiseForce;
        x *= (random + 1);
        y *= (random + 1);
        var vertex = new THREE.Vector3(x, y, z);
        vertex.applyAxisAngle(new THREE.Vector3(0, 0.1, 0).normalize(), index * Math.PI);
        points.push(vertex);
    }
    this.curve = new THREE.CatmullRomCurve3(points);
    this.curve.closed = true;
    var geometry = new THREE.Geometry();
    geometry.vertices = this.curve.getPoints(150);
    var material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: options.pathOpacity
    });
    this.lace = new THREE.Line(geometry, material);
    this.object = new THREE.Object3D();
    this.object.add(this.lace);

    this.items = new THREE.Object3D();
    this.object.add(this.items);
    var itemGeometry = new THREE.SphereBufferGeometry(options.itemRadius, 8, 8);
    var itemMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });
    var mesh = null;
    var percent = 0;
    var material = null;
    var p1 = null;
    var size = 1;
    for (i = 0; i < options.itemQuantity; i++) {
        material = itemMaterial.clone();
        material.color = new THREE.Color("hsl(" + (options.colorOffset + Math.random() * options.colorRange) + ",100%,50%)");
        percent = i / options.itemQuantity;
        mesh = new THREE.Mesh(itemGeometry, material);
        p1 = this.curve.getPointAt(percent);
        mesh.position.x = p1.x;
        mesh.position.y = p1.y;
        mesh.position.z = p1.z;
        size = 1 - (Math.random() * options.itemsScaleRange);
        mesh.scale.set(size, size, size);
        this.items.add(mesh);
    }
    this.speed = (Math.random() + 0.01) * options.maxSpeed * 0.00015;
}

Necklace.prototype.updateSpheres = function (a) {
    var percent = 0;
    for (var i = 0; i < this.items.children.length; i++) {
        percent = i / options.itemQuantity;
        var p1 = this.curve.getPointAt((percent + a * this.speed) % 1);
        this.items.children[i].position.set(p1.x, p1.y, p1.z);
    }
};

function initHeart() {
    atoms = new THREE.Object3D();
    //Black heart
    var geom = new THREE.SphereBufferGeometry(options.heartRadius, 20, 20);
    var mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    var core = new THREE.Mesh(geom, mat);
    scene.add(core);

    //Geometry template for the atoms
    var geom = new THREE.SphereBufferGeometry(1, 14, 14);
    var mat = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    scene.add(atoms);
    for (var i = 0; i < options.atomsQuantity; i++) {
        var atom = new THREE.Mesh(geom, mat);
        var size = Math.random() * options.atomsScale + 1.5;
        atom.speedX = (Math.random() - 0.5) * (options.atomsSpeed * 0.02);
        atom.speedY = (Math.random() - 0.5) * (options.atomsSpeed * 0.02);
        atom.speedZ = (Math.random() - 0.5) * (options.atomsSpeed * 0.02);
        atom.applyMatrix(new THREE.Matrix4().makeScale(size, size, size));
        atom.applyMatrix(new THREE.Matrix4().makeTranslation(0, options.heartRadius + Math.random() * 10, 0));
        atom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.random() * (Math.PI * 2)));
        atom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.random() * (Math.PI * 2)));
        atom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.random() * (Math.PI * 2)));
        atoms.add(atom);
    }
}

//Animate the atoms rotating around the black center
function updateHeart(a) {
    //Loop through all atoms
    for (var i = 0; i < options.atomsQuantity; i++) {
        var part = atoms.children[i];
        //Update its rotation in the 3 axis
        part.applyMatrix(new THREE.Matrix4().makeRotationX(part.speedX));
        part.applyMatrix(new THREE.Matrix4().makeRotationY(part.speedY));
        part.applyMatrix(new THREE.Matrix4().makeRotationZ(part.speedZ));
    }
}

var pointLight = new THREE.PointLight(0xffffff, 0.5);
var light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.5);
var atoms = new THREE.Object3D();
var necks, cubesObject;

//On resize of the scren, reset the scene parameters
window.addEventListener("resize", function () {
    ww = window.innerWidth;
    wh = window.innerHeight;
    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();
    renderer.setSize(ww, wh);
});

// ========  
//RENDER
// ========  
function render(a) {
    requestAnimationFrame(render);

    for (var i = 0; i < necks.length; i++) {
        necks[i].updateSpheres(a);
    }

    //Update
    updateHeart();

    renderer.render(scene, camera);
}

initScene();
requestAnimationFrame(render);