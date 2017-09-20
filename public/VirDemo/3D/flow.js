/**
 * Use perlin noise to create flow
 * 
 * That will need HTML data;
 * <canvas></canvas>
    <script type="x-shader/x-vertex" id="wrapVertexShader">
        attribute vec2 velocity; varying vec2 vVel; void main() { vVel = velocity; vec4 mvPosition = modelViewMatrix * vec4( position.xy,
        1.0, 1.0 ); gl_PointSize = 2.0; gl_Position = projectionMatrix * mvPosition; }
    </script>
    <script type="x-shader/x-fragment" id="wrapFragmentShader">
        varying vec2 vVel; void main(){ vec4 color = vec4(abs(sin(vVel.x*0.7)+0.3),0.0,abs(cos(vVel.y*0.7)+0.3), 1.0 ); gl_FragColor
        = color; }
    </script>
    <script src="3D/flow.js"></script>
 */

class Particle {
    constructor() {
        var x = Math.random() * width;
        var y = Math.random() * height;
        this.pos = new THREE.Vector2(x, y, 0);
        this.vel = new THREE.Vector2(Math.random() - 0.5, Math.random() - 0.5);
        this.acc = new THREE.Vector2(0, 0);
        this.maxspeed = new THREE.Vector2(1, 1);
        this.minspeed = new THREE.Vector2(-1, -1);
        this.color = new THREE.Color(0xffffff);
        this.mass = Math.floor((Math.random() * 0.05 + 0.95) * 100) / 100;
    }

    follow() {
        var x = Math.floor(this.pos.x / scl);
        var y = Math.floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = flowfield[index];
        force.multiplyScalar(this.mass);
        this.acc.add(force);
    }
    update() {
        this.vel.add(this.acc);
        this.vel.clamp(this.minspeed, this.maxspeed);
        this.pos.add(this.vel);
        //Reset acceleration to 0
        this.acc.multiplyScalar(0);
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }
}

var ww = window.innerWidth,
    wh = window.innerHeight;
var width = 500;
var height = 500;
var scl = 10;
var cols = Math.floor(width / scl);
var rows = Math.floor(height / scl);
var amount = 50000;

var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas"),
    antialias: true
});
renderer.setSize(ww, wh);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, ww / wh, 1, 10000);
var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
camera.position.set(width * 0.5, height * 0.5, 800);
scene.add(camera);

var particles = [];

var geom = new THREE.BufferGeometry();
var positions = new Float32Array(amount * 2);
var velocities = new Float32Array(amount * 2);
for (var i = 0; i < amount; i++) {
    var particle = new Particle()
    particles.push(particle);
    particle.pos.toArray(positions, i * 2);
    particle.vel.toArray(velocities, i * 2);
}
var buffer = new THREE.BufferAttribute(positions, 2);
geom.addAttribute('position', buffer);
var buffer = new THREE.BufferAttribute(velocities, 2);
geom.addAttribute('velocity', buffer);

var mat = new THREE.PointsMaterial({
    color: 0xffffff,
    vertexColors: THREE.VertexColors
});
var mat = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: document.getElementById("wrapVertexShader").textContent,
    fragmentShader: document.getElementById("wrapFragmentShader").textContent
});

var mesh = new THREE.Points(geom, mat);
scene.add(mesh);

//Init forces

var flowfield = [];
var inc = 0.03;
noise.seed(Math.random());
function forces(a) {
    var yoff = 0;
    for (var y = 0; y <= rows; y++) {
        var xoff = 0;
        for (var x = 0; x <= cols; x++) {
            var index = x + y * cols;
            var angle = noise.simplex3(xoff, yoff, a * 0.0002) * Math.PI;
            var v = new THREE.Vector2(Math.cos(angle) * 0.1, Math.sin(angle) * 0.1);
            flowfield[index] = v;
            xoff += inc;
        }
        yoff += inc;

    }
}



var positions = new Float32Array(amount * 2);
var velocities = new Float32Array(amount * 2);
function updateAttributes() {
    for (var i = 0; i < amount; i++) {
        particle = particles[i];
        geom.attributes.position.array[i * 2] = particle.pos.x;
        geom.attributes.position.array[i * 2 + 1] = particle.pos.y;
        geom.attributes.position.array[i * 2 + 2] = particle.pos.z;
        geom.attributes.velocity.array[i * 2] = particle.vel.x;
        geom.attributes.velocity.array[i * 2 + 1] = particle.vel.y;
        geom.attributes.velocity.array[i * 2 + 2] = particle.vel.z;
    }
    geom.attributes.position.needsUpdate = true;
    geom.attributes.velocity.needsUpdate = true;
}

window.addEventListener("resize", function () {
    ww = window.innerWidth;
    wh = window.innerHeight;
    camera.left = - width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = - height / 2;
    renderer.setSize(ww, wh);
});


function render(a) {
    requestAnimationFrame(render);

    forces(a);

    for (var i = 0; i < amount; i++) {
        particles[i].follow();
        particles[i].update();
        particles[i].edges();
    }

    updateAttributes();

    // renderer.setClearColor(new THREE.Color(
    //     Math.abs(Math.sin(particles[0].vel.x * 0.7)),
    //     0.0,
    //     Math.abs(Math.cos(particles[0].vel.y * 0.7))
    // ), 0.1);

    renderer.render(scene, camera);
}

window.addEventListener("mousedown", function () {
    noise.seed(Math.random() * 100);
    for (var i = 0; i < amount; i++) {
        particle.pos.set(Math.random() * width, Math.random() * height)
    }
});
requestAnimationFrame(render);