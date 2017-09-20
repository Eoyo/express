//Get window size
var ww = window.innerWidth,
    wh = window.innerHeight;


//Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);

//Create an empty scene
var scene = new THREE.Scene();

//Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
camera.position.z = 400;

//Array of points
var points = [
    [68.5, 185.5],
    [1, 262.5],
    [270.9, 281.9],
    [345.5, 212.8],
    [178, 155.7],
    [240.3, 72.3],
    [153.4, 0.6],
    [52.6, 53.3],
    [68.5, 185.5]
];

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
    var x = points[i][0];
    var y = 0;
    var z = points[i][1];
    points[i] = new THREE.Vector3(x, y, z);
}
//Create a path from the points
var path = new THREE.CatmullRomCurve3(points);

//Create the tube geometry from the path
var geometry = new THREE.TubeGeometry(path, 100, 20, 30, true);
//Basic material
var material = new THREE.MeshBasicMaterial({ color: 0x2ccdd1, side: THREE.BackSide, wireframe: true });
//Create a mesh
var tube = new THREE.Mesh(geometry, material);
//Add tube into the scene
scene.add(tube);

var poi = new THREE.Vector3(100, 0, 120);
var vec = {
    diLength(vector, length) {
        var srcLength = vector.length();
        var di = length / srcLength;
        return vector.multiplyScalar(di);
    }
}


var percentage = 0;
function render() {

    percentage += 0.001;
    var p1 = path.getPointAt(percentage % 1);
    var p2 = path.getPointAt((percentage + 0.01) % 1);

    //my editing
    vec.diLength(p1.sub(p2), 166).add(p2);
    p1.y += 100;
    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);

    //Render the scene
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);
/**
 * use three.js
 * render = new THREE.
 */

