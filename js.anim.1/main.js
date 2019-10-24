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

var bubbles = [];
var canvas;
var COUNT = 10;

var redraw = function () {
    canvas.clear();     // clear canvas
    canvas.prep();      // prep canvas with background color
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
    for (let j = i + 1; j < bubbles.length; j++) {
        }
    bubbles[i].draw();
    }
}

var repeater = function () {
    setInterval(redraw, 15);
}

//Create Canvas and bubbles's
var initialize = function () {
    canvas = Object.create(Canvas);
    canvas.init('myCanvas', '#000');
    
    for (let i = 0; i < COUNT; i += 1) {
        let bubble = Object.create(Umo);
        bubble.init(canvas, getRndColor());
        bubbles.push(bubble);
    }
    repeater();
};

window.addEventListener('load', initialize);

//Give the bubble's a random color
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
    this.r = Math.random() * 9 + 3;
    this.dx = Math.random() * 5;
    this.dy = Math.random() * 5;
    this.color = getRndColor();
},
            
draw() {
    this.canvas.getContext().beginPath();
    this.canvas.getContext().fillStyle = this.color;
    this.canvas.getContext().arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
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
    for (let j = 0; j < bubbles.length; j++){
        if (this === bubbles[j]) {
            continue;
        } else {
            if (this.hit(bubbles[j])) { //Når en bubble rammer, udregnes arealet
                let a1 = this.getArea();
                let a2 = bubbles[j].getArea();
                a1 += a2;
                a1 /= Math.PI;
                a1 = Math.sqrt(a1);
                if (this.r >= bubbles[j].r) { //Hvis radius er større eller =, bliver de mindre spist
                    this.r = a1;
                    bubbles.splice(j, 1);
                } else { 
                    bubbles[j].r = a1;
                }
            }
        }
    }
    if (bubbles.length === 1) {
        window.alert('No more bubbles left :(');
    }
},

getArea() {
    return Math.PI * Math.pow(this.r, 2);
},

hit(ob) {
    return Math.sqrt(Math.pow(this.x - ob.x, 2) + Math.pow(this.y - ob.y, 2)) <= (this.r + ob.r)
},

}



