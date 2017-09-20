class Particle {
    constructor(op) {
        this.angle = 0;
        this.curve = 0;
        this.pos = [0, 0];
        this.size = 100;
        this.speed = 1;
        this.tick = 0;
        this.color = 'rgba(255,64,64,.95)';
        this.hue = 0;
        this.waveX = false;
        this.waveY = false;
        this.index = 0;
        this.di = 2;
        Object.assign(this, op);
    }
    move() {
        this.angle += this.curve;
        var radians = this.angle * Math.PI / 180;
        this.pos[0] += Math.cos(radians) * this.speed * Math.cos(this.tick / 50);
        this.pos[1] += Math.sin(radians) * this.speed * Math.cos(this.tick / 50);
        this.hue+= this.di;
        this.color = 'hsl(' + this.hue + ', 80%, 65%)';
        this.tick++;
    }
    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
// config
var config = {
    num: 0
    , size: 0
    , speed: 0
    , delay: 0
}

/**
 * data for everyone ball;
 */
var particles = [new Particle()];
particles = [];

/**
 * use for drawing
 */
var ctx = {
    v: null
    , canvas: null
    , particles: []
    , from(canvas) {
        this.canvas = canvas;
        this.v = canvas.getContext("2d");
    }
    , fade() {
        var ctx = this.v;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    }
    , clear() {
        var ctx = this.v;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        particles.length = [];
    }
    , resize() {
        var canvas = ctx.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    , createBall(angle) {
        var n = 1;
        var origin = [
            this.canvas.width / 2,
            this.canvas.height / 2
        ]
        for (var i = 0; i < n; i++) {
            particles.push(new Particle({
                angle: angle,
                pos: [origin[0], origin[1]],
                size: config.size,
                speed: config.speed,
                index: i
            }));
        }
    }
    , start(delay) {
        ctx.clear();
        config.toCreate = config.num;
    }
    , tick:0
    , draw() {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.move();
            p.draw(ctx.v);
        }
        ctx.fade();
        window.requestAnimationFrame(ctx.draw);

        if (config.toCreate) {
            if (!(ctx.tick % (config.delay))) {
                ctx.createBall((180 / config.num) * config.toCreate);
                config.toCreate--;
            }
        }
        ctx.tick++;
    }
}

/**
 * command help functions
 */
var hlp = {
    rand(min, max) {
        return Math.random() * (max - min) + min;
    }
    , randColor(min, max) {
        var r = Math.floor(this.rand(min, max)),
            g = Math.floor(this.rand(min, max)),
            b = Math.floor(this.rand(min, max));
        return 'rgba(' + r + ',' + g + ',' + b + ',1)';
    }
}

/**
 * for settings functions
 */
var stt = {
    all: null
    , from(id) {
        this.all = document.getElementById(id);
        return stt;
    }
    , preset(options) {
        for (var i in options) {
            this.all[i].value = options[i];
        }
        this.all.btnSet.onclick();
    }

    /**
     * set GO button click function;
     */
    , initAll() {
        var settings = this.all;
        settings.btnSet.onclick = function () {
            config.num = parseInt(settings.inNum.value);
            config.size = parseInt(settings.inSize.value);
            config.speed = parseInt(settings.inSpeed.value);
            config.delay = parseInt(settings.inDelay.value);
            ctx.start(config.delay);
        }

        // Presets.
        settings.preset0.onclick = function () {
            stt.preset({
                inNum: 20,
                inSize: 20,
                inSpeed: 5,
                inDelay: 8
            });
        }
        settings.preset1.onclick = function () {
            stt.preset({
                inNum: 184,
                inSize: 10,
                inSpeed: 5,
                inDelay: 6
            });
        }
        settings.preset2.onclick = function () {
            stt.preset({
                inNum: 79,
                inSize: 10,
                inSpeed: 5,
                inDelay: 6
            });
        }
        settings.preset3.onclick = function () {
            stt.preset({
                inNum: 20,
                inSize: 30,
                inSpeed: 5,
                inDelay: 3
            });
        }
        settings.preset4.onclick = function () {
            stt.preset({
                inNum:80,
                inSize:2,
                inSpeed:20,
                inDelay:1
            });
        }
    }
}


//run
var canvas = document.createElement('canvas');
ctx.from(canvas);
stt.from("settings")
    .initAll();

ctx.resize();

// Fire the Go! button.
stt.all.btnSet.onclick();

// Attach canvas.
document.body.appendChild(canvas);

// Begin drawing.
window.requestAnimationFrame(ctx.draw);

// Sync canvas to window.
window.onresize = ctx.resize;