function AndOrGate(x,y){
  this.topRampSegment = {
    location: new Vector(x,y),
    size: new Vector(20,10),
    draw: "line",
    strokeStyle: "rgb(0,0,0)",
    lineWidth: 3
  };
  
  this.bottomRampSegment = {
    location: new Vector(x+40,y+20),
    size: new Vector(20,10),
    draw: "line",
    strokeStyle: "rgb(0,0,0)",
    lineWidth: 3
  }
  
  this.trapDoor = {
    location: new Vector(x+20,y+30),
    size: new Vector(20,0),
    draw: "line",
    strokeStyle: "rgb(255,0,0)",
    lineWidth: 3
  }
  
  this._or = false;
  this._open = false;
  this.location = new Vector(x,y);
  
  Widgets.add(this);
}

AndOrGate.prototype.update = function(){
  if (this._or){
    if (!this._open) this._orBall.location = new Vector(this.location.x + 25, this.location.y+20);
    var surface = {
      start: this.location,
      end: new Vector(this.location.x+60, this.location.y+30)
    }
    var self = this;
    Balls.balls.map(function(ball){self.rampCheck(surface,ball);});
  } else {
    var surface = {
      start: this.location,
      end: new Vector(this.location.x+25, this.location.y+12.5)
    }
    var self = this;
    Balls.balls.map(function(ball){self.rampCheck(surface,ball);});
    
    var surface = {
      start: new Vector(this.location.x+40, this.location.y+20),
      end: new Vector(this.location.x+60, this.location.y+30)
    }
    var self = this;
    Balls.balls.map(function(ball){self.rampCheck(surface,ball);});
    
    if (!this._open){
      var surface = {
        start: new Vector(this.location.x+15, this.location.y+30),
        end: new Vector(this.location.x+35, this.location.y+30)
      }
      var self = this;
      Balls.balls.map(function(ball){self.doorCheck(surface,ball);});
    }
  }

  Screen.append(this.topRampSegment, 1);
  Screen.append(this.bottomRampSegment, 1);
  Screen.append(this.trapDoor, 1);
}

AndOrGate.prototype.rampCheck = function(surface, ball){
  var motion = {
    start: ball.lastLocation.add(ball.hitOffset),
    end: ball.location.add(ball.hitOffset)
  }
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

AndOrGate.prototype.doorCheck = function(surface, ball){
  var motion = {
    start: ball.lastLocation.add(ball.hitOffset),
    end: ball.location.add(ball.hitOffset)
  }
  var intersect = MotionSurfaceIntersection(motion,surface);
  if (!isNaN(intersect)){
    this._orBall = ball;
    this._or = true;
    ball.location = new Vector(this.location.x + 25, this.location.y+20);
  }
}

AndOrGate.prototype.open = function(){
  this._open = true;
  this.trapDoor.strokeStyle = "rgb(0,255,0)"
  this._orBall = null;
  this._or = false;
}
AndOrGate.prototype.close = function(){
  this._open = false;
  this.trapDoor.strokeStyle = "rgb(255,0,0)"
}
AndOrGate.prototype.isOpen = function(){
  return this._open;
}
AndOrGate.prototype.trigger = function(){
  this.open();
  var self = this;
  setTimeout(function(){self.close();}, 150);
}