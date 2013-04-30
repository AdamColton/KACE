function Ramp(x,y,dx,dy){
  this.location = new Vector(x,y);
  this.size = new Vector(dx,dy);
  Widgets.add(this);
}
Ramp.prototype.update = function(){
  var surface = {start: this.location, end: this.location.add(this.size)};
  Balls.balls.map(function(ball){collisionCheck(surface,ball);});
  Screen.append(this, 1);
}

Ramp.prototype.draw = "line";
Ramp.prototype.strokeStyle = "rgb(0,0,0)";
Ramp.prototype.lineWidth = 3;
Ramp.prototype.trigger = function(){}