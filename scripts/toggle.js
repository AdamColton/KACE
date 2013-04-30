function Toggle(x,y){
  this.location = new Vector(x,y);
  this.left = true;
  this.leftToggleBase = new _togglePart(new Vector(x-30,y+10), new Vector(60,-20));
  this.leftToggleSwitch = new _togglePart(new Vector(x,y), new Vector(-10,-30));
  this.rightToggleBase = new _togglePart(new Vector(x-30,y-10), new Vector(60,20));
  this.rightToggleSwitch = new _togglePart(new Vector(x,y), new Vector(10,-30));
  Widgets.add(this);
}

Toggle.prototype.update = function(){
  /*var self = this;*/
  //This is bad - fix it
  var toggle = false;
  for(var i=Balls.balls.first() ; i!=Balls.balls.end ; i=i.next){
    var ball = i.payload;
    var surface = {start: new Vector(this.location.x, this.location.y)};
    if (this.left){
      surface.end = new Vector(this.location.x-30, this.location.y+10);
      collisionCheck(surface, ball);
      surface.end = new Vector(this.location.x-10, this.location.y-30);
      collisionCheck(surface, ball);
      surface.end = new Vector(this.location.x+30, this.location.y-10);
      if (this.switchCheck(surface, ball)) toggle = true;
    } else {
      surface.end = new Vector(this.location.x+30, this.location.y+10);
      collisionCheck(surface, ball);
      surface.end = new Vector(this.location.x+10, this.location.y-30);
      collisionCheck(surface, ball);
      surface.end = new Vector(this.location.x-30, this.location.y-10);
      if (this.switchCheck(surface, ball)) toggle = true;
    }
  }
  if (toggle){
    this.left = !this.left;
  }
  
  if (this.left){
    Screen.append(this.leftToggleBase, 1);
    Screen.append(this.leftToggleSwitch, 1);
  } else {
    Screen.append(this.rightToggleBase, 1);
    Screen.append(this.rightToggleSwitch, 1);
  }
}

Toggle.prototype.rampCheck = function(motion, surface, ball){  
  var intersect = MotionSurfaceIntersection(motion,surface);
  if (!isNaN(intersect)){
    var size = surface.end.subtract(surface.start);
    var dy = ball.location.subtract(ball.lastLocation).y;
    var v = new Vector(size.x, size.y).setMagnitude(1);
    if (v.y < 0) v = v.reverse();
    var m = dy * (1-intersect) * v.y;
    ball.location.x = ball.lastLocation.x + m*v.x;
    ball.location.y = ball.lastLocation.y + dy * intersect + m*v.y - 1;
  }
}

Toggle.prototype.switchCheck = function(surface, ball){
  var motion = {start: ball.lastLocation.add(ball.hitOffset), end: ball.location.add(ball.hitOffset)};
  var b = !isNaN( MotionSurfaceIntersection(motion,surface) )
  if (b){
    ball.location.y -= 7;
    if (!this.left){
      ball.location.x -= 12;
    } else {
      ball.location.x += 12;
    }
  }
  return b;
}

function _togglePart(location, size){
  this.location = location;
  this.size = size;
}
_togglePart.prototype.draw = "line";
_togglePart.prototype.strokeStyle = "rgb(0,0,0)";
_togglePart.prototype.lineWidth = 3;

function _testPart(location, size){
  this.location = location;
  this.size = size;
}
_testPart.prototype.draw = "line";
_testPart.prototype.strokeStyle = "rgb(255,0,0)";
_testPart.prototype.lineWidth = 3;
Toggle.prototype.trigger = function(){}