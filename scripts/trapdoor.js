function Trapdoor(x,y){
  this.location = new Vector(x-10,y);
  this.strokeStyle = "rgb(255,0,0)";
  this._open = false;
  Widgets.add(this);
}
Trapdoor.prototype.draw = "line"
Trapdoor.prototype.lineWidth = 3;
Trapdoor.prototype.size = new Vector(20,0);

Trapdoor.prototype.update = function(){
  var self = this;
  if (!this._open) Balls.balls.map(function(x){self.collisionCheck(x);});
  Screen.append(this, 1);
}

Trapdoor.prototype.open = function(){
  this._open = true;
  this.strokeStyle = "rgb(0,255,0)";
}

Trapdoor.prototype.close = function(){
  this._open = false;
  this.strokeStyle = "rgb(255,0,0)";
}

Trapdoor.prototype.isOpen = function(){
  return this._open;
}

Trapdoor.prototype.collisionCheck = function(ball){
  var motion = {start: ball.lastLocation.add(ball.hitOffset), end: ball.location.add(ball.hitOffset)};
  var surface = {start: this.location, end: this.location.add(this.size)};
  var intersect = MotionSurfaceIntersection(motion,surface);
  if (!isNaN(intersect)){
    ball.location.x = this.location.x+5;
    ball.location.y = this.location.y-10;
  }
}
Trapdoor.prototype.trigger = function(){
  this.open();
  var self = this;
  setTimeout(function(){self.close();}, 150);
}