// pong by brakdag@gmail.com 
"use strict";

/** Bar class 
 * 
 * 
*/
var Bar = function(json)
{
    this.id = null;
    this.x = 20;
    this.y = 50;
    this.height = 100;
    this.width = 20;
    this.init(json);
}
Bar.prototype.init = function(json)
{
    for(var i in json)
        this[i]= json[i];
}
Bar.prototype.draw = function(context)
{
    context.fillStyle="#FF0000";
    context.fillRect(this.x,this.y,this.width,this.height);
}

/** Ball class
 * 
 */
var Ball = function (json)
{
    this.radio=20;
    this.x=0;
    this.y=0;
    this.vx=7;
    this.vy=7;
    this.init(json);
}
Ball.prototype.init = function(json)
{
    for(var i in json)
        this[i]= json[i];
}
Ball.prototype.update = function()
{
    this.x +=this.vx;
    this.y += this.vy;
    if (this.y < 0) this.vy = this.vy*(-1);
    if (this.y > 512) this.vy = this.vy*(-1);
    if (this.x < 0) this.vx = this.vx*(-1);
    if (this.x > 1024) this.vx = this.vx*(-1);
    
}
Ball.prototype.draw = function(context)
{
    context.beginPath();
    context.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
}

/**
 * Game Class
 *
 */


var Game = function(json)
{
    this.canvas = document.getElementById("screen");
    this.ctx = this.canvas.getContext("2d");
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.status = "inicio";
    this.bars = [];
    this.balls = [];
    this.score = 0;
    this.init(json);
}

Game.prototype.init = function(json)
{
    for(var i in json)
        this[i]= json[i];
}
Game.prototype.start = function()
{
    this.bars.push(new Bar({id:1,x:100,y:100}));
    this.bars.push(new Bar({x:(this.width-50)}));
    this.balls.push(new Ball({x:(this.width/2),y:(this.height/2)}));
    this.loop();
}

Game.prototype.loop = function()
{
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillText("score: " + this.score, this.width/2, 25);
    for(var i in this.balls)
    {
        this.balls[i].update();
        this.balls[i].draw(this.ctx);
    }

    for (var i in this.bars)
    this.bars[i].draw(this.ctx);
    var self = this;
    setTimeout(function(){self.loop();},20);
}

Game.prototype.checkColision = function (obj1,obj2)
{
    //colisión eje x
    var colx = false;
    var coly = false;

    for (var i = obj1.x; i<(obj1.x+obj1.width);i++)
    {
        if ((i> obj2.x) && (i< obj2.x+obj2.width))
            colx=true;
    }
    //Colisión eje y
 
    for (var i = obj1.y; i<(obj1.y+obj1.height);i++)
    {
        if ((i> obj2.y) && (i < (obj2.y+obj2.height))) coly = true;
    }

    console.log(colx + coly);
    if ((colx==true) && (coly==true)) 
        {return true;}
    else
        {return false;}
}


function myEventHandler(e){
var code = e.keyCode;
    if (code == 65) g.bars[0].y-=10;
    if (code == 90) g.bars[0].y+=10;
    if (code == 38) g.bars[1].y-=10;
    if (code == 40) g.bars[1].y+=10;
    
    //alert(code);
}



var g = new Game();
document.addEventListener("keydown", myEventHandler, false);
g.start();