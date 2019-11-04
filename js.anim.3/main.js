'use strict';

var $ = function (foo) {
    return document.getElementById(foo);
}

//Cnavas Object
let Canvas = {
    init(canvasId, color) {
        this.canvas = $(canvasId);
        this.context = this.canvas.getContext("2d");
        this.color = color;
        this.prep();
    },
    prep() {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext() {
        return this.context;
    },
    getHeight() {
        return this.canvas.height;
    },
    getWidth () {
        return this.canvas.width;
    }
};

var arr = [];
var canvas;

var redraw = function () {
    canvas.clear();     // clear canvas
    canvas.prep();      // prep canvas with background color
    for (let umo of arr) {
    umo.move();  // change coordinates
    umo.draw();  // draw again with new coordinates
    }
}

var repeater = function () {  
    setInterval(redraw, 20);
}

//Create Canvas and Umo
var initialize = function () {
    canvas = Object.create(Canvas);
    canvas.init('myCanvas', '#000');
    let object = Object.create(Umo);
                object.init(canvas, 0, 0, 5, 'blue', 0, 2, 390, 190); //earth
                arr.push(object);
        object = Object.create(Umo);
                object.init(canvas, 0, 0, 5, 'yellow', 0, 0, 0, 0); //sun
                arr.push(object);
                repeater();

}

window.addEventListener('load', initialize);

let Umo = {
    init(canvas, x, y, r, color, dg, ddg, rx, ry) {
    this.canvas = canvas;
    this.color = color;
    this.x = x;
    this.y = y;
    this.r = r;
    this.dg = dg;
    this.ddg = ddg;
    this.rx = rx;
    this.ry = ry;
},

draw() {
    this.canvas.getContext().beginPath();
    this.canvas.getContext().fillStyle = this.color;
    this.canvas.getContext().arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    this.canvas.getContext().fill();
    this.canvas.getContext().closePath();
},

move() { 
    this.dg += this.ddg;
    this.x = this.canvas.getWidth() / 2 + this.rx * Math.cos(deg2rad(this.dg));
    this.y = this.canvas.getHeight() / 2 + this.ry * Math.sin(deg2rad(this.dg));
    }
};