function Trash(x,y){
  this.location = new Vector(x,y);
  this.slash1 = {
    location: new Vector(x-10,y-10),
    size: new Vector(20,20),
    draw: "line",
    strokeStyle: "rgb(255,0,0)",
    lineWidth: 3
  };
  this.slash2 = {
    location: new Vector(x+10,y-10),
    size: new Vector(-20,20),
    draw: "line",
    strokeStyle: "rgb(255,0,0)",
    lineWidth: 3
  };
  Widgets.add(this);
}

Trash.prototype.update = function(){
  var self = this;
  if (!this._open) Balls.balls.map(function(x){self.collisionCheck(x);});
  Screen.append(this.slash1, 1);
  Screen.append(this.slash2, 1);
}

Trash.prototype.collisionCheck = function(ball){
  var motion = {start: ball.lastLocation.add(ball.hitOffset), end: ball.location.add(ball.hitOffset)};
  var surface = {start: new Vector(this.location.x-10, this.location.y), end: new Vector(this.location.x+10, this.location.y)};
  var intersect = MotionSurfaceIntersection(motion,surface);
  if (!isNaN(intersect)) ball.remove();
}
Trash.prototype.trigger = function(){}