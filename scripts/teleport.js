function Teleporter(xIn, yIn, xOut, yOut){
  this.location = new Vector(xIn, yIn);
  this.inGate = {
    location: new Vector(xIn-10,yIn),
    size: new Vector(20,0),
    strokeStyle: "rgb(242,171,48)",
    draw: "line",
    lineWidth: 3
  };
  this.outGate = {
    location: new Vector(xOut-10,yOut),
    size: new Vector(20,0),
    strokeStyle: "rgb(25,179,168)",
    draw: "line",
    lineWidth: 3
  };
  this.connect = {
    location: new Vector(xIn,yIn),
    size: new Vector(xOut-xIn, yOut-yIn),
    strokeStyle: "rgb(200, 200, 200)",
    draw: "line",
    lineWidth: 3
  };
  Widgets.add(this);
}

Teleporter.prototype.update = function(){
  var self = this;
  if (!this._open) Balls.balls.map(function(x){self.collisionCheck(x);});
  Screen.append(this.inGate, 1);
  Screen.append(this.outGate, 1);
  Screen.append(this.connect, 1);
}

Teleporter.prototype.collisionCheck = function(ball){
  var motion = {start: ball.lastLocation.add(ball.hitOffset), end: ball.location.add(ball.hitOffset)};
  var surface = {start: this.inGate.location, end: this.inGate.location.add(this.inGate.size)};
  var intersect = MotionSurfaceIntersection(motion,surface);
  if (!isNaN(intersect)){
    ball.location.x = this.outGate.location.x+5;
    ball.location.y = this.outGate.location.y;
    ball.lastLocation = ball.location;
  }
}
Teleporter.prototype.trigger = function(){}