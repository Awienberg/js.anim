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

var rects = [];
var canvas;
var COUNT = 10;

var redraw = function () {
    canvas.clear();     // clear canvas
    canvas.prep();      // prep canvas with background color
    for (let i = 0; i < rects.length; i++) {
        rects[i].move();
    for (let j = i + 1; j < rects.length; j++) {
        }
        rects[i].draw();
    }
}

var repeater = function () {
    setInterval(redraw, 15);
}

//Create Canvas and rect's
var initialize = function () {
    canvas = Object.create(Canvas);
    canvas.init('myCanvas', '#000');
    for (let i = 0; i < COUNT; i += 1) {
        let rect = Object.create(Umo);
        rect.init(canvas, getRndColor());
        rects.push(rect);
    }
    repeater();
};

window.addEventListener('load', initialize);

//Give the rect's a random color
let getRndColor = function() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

let Umo = {
    init(canvas) {
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
    if (this.x + this.dx > this.canvas.getWidth() || this.x + this.dx < 0)
    this.dx = -this.dx;

    if (this.y + this.dy > this.canvas.getHeight() || this.y + this.dy < 0)
    this.dy = -this.dy;
            
    this.x += this.dx;
    this.y += this.dy;
    
    //
    for (let j = 0; j < rects.length; j++){
        if (this === rects[j]) {
            continue;
        } else {
            if (this.hit(rects[j])) { //Når et object rammer, udregnes arealet
                let a1 = this.getArea();
                let a2 = rects[j].getArea();
                a1 += a2;
                a1 /= Math.PI;
                a1 = Math.sqrt(a1);
                if (this.r >= rects[j].r) { //Hvis radius er større eller =, bliver de mindre spist
                    this.r = a1;
                    rects.splice(j, 1);
                } else { 
                    rects[j].r = a1;
                }
            }
        }
    }
    if (rects.length === 1) {
        window.alert('No more objects left :(');
    }
},

getArea() {
    return Math.PI * Math.pow(this.r, 2);
},

hit(ob) {
    return Math.sqrt(Math.pow(this.x - ob.x, 2) + Math.pow(this.y - ob.y, 2)) <= (this.r + ob.r)
},

}
