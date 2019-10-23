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
}

var arr = [];
var canvas;

var redraw = function () {
    canvas.clear();     // clear canvas
    canvas.prep();      // prep canvas with background color
    for (let rect of arr) {
    rect.move();  // change coordinates
    rect.draw();  // draw again with new coordinates
    }
}

var repeater = function () {
    setInterval(redraw, 10);
}

//Create Canvas and disk's
var initialize = function () {
    canvas = Object.create(Canvas);
    canvas.init('myCanvas', '#000');
    let object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
             object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
             object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
             object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
             object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
             object = Object.create(rect);
             object.init(canvas);
                   arr.push (object);
                   object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
                object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
                object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
                object = Object.create(rect);
             object.init(canvas);
                arr.push (object);
                repeater();
}

window.addEventListener('load', initialize);

//Give the object's a random color
let getRndColor = function() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

let rect = {
    init(canvas, h, w) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.getWidth();
    this.y = Math.random() * this.canvas.getHeight();
    this.h = Math.random() * 9 + 3; 
    this.w = Math.random() * 9 + 3;
    this.dx = Math.random() * 5;
    this.dy = Math.random() * 5;
    this.color = getRndColor();
},

draw() {
    this.canvas.getContext().beginPath();
    this.canvas.getContext().fillStyle = this.color;
    this.canvas.getContext().fillRect(this.x, this.y, this.h, this.w);
    this.canvas.getContext().fill();
    this.canvas.getContext().closePath();
},
            
move() {
    if (this.x + this.dx > this.canvas.getWidth()
        || this.x + this.dx < 0)
    this.dx = -this.dx;
    if (this.y + this.dy > this.canvas.getHeight()
        || this.y + this.dy < 0)
    this.dy = -this.dy;
            
    this.x += this.dx;
    this.y += this.dy;
},
}