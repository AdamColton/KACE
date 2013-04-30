function Piston(x,y){
  this.location = new Vector(x,y);
  this.pusherHorizontal = {
    location: new Vector(x,y+10),
    size: new Vector(20,0),
    draw: "line",
    strokeStyle: "rgb(0,0,255)",
    lineWidth: 3
  };
  this.pusherVertical = {
    location: new Vector(x+20,y),
    size: new Vector(0,20),
    draw: "line",
    strokeStyle: "rgb(0,0,255)",
    lineWidth: 3
  };
  this.door1 = {
    location: new Vector(x+20,y+20),
    size: new Vector(20,0),
    draw: "line",
    strokeStyle: "rgb(255,0,0)",
    lineWidth: 3,
    ball: null
  };
  this.sliderLeft = {
    location: new Vector(x+40,y),
    size: new Vector(0,20),
    draw: "line",
    strokeStyle: "rgb(0,0,255)",
    lineWidth: 3
  };
  this.sliderRight = {
    location: new Vector(x+60,y),
    size: new Vector(0,20),
    draw: "line",
    strokeStyle: "rgb(0,0,255)",
    lineWidth: 3
  };
  this.sliderMid = {
    location: new Vector(x+40,y+10),
    size: new Vector(20,0),
    draw: "line",
    strokeStyle: "rgb(0,0,255)",
    lineWidth: 3
  };
  this.platform = {
    location: new Vector(x+40,y+20),
    size: new Vector(20,0),
    draw: "line",
    strokeStyle: "rgb(0,0,0)",
    lineWidth: 3
  };
  this.door2 = {
    location: new Vector(x+60,y+20),
    size: new Vector(20,0),
    draw: "line",
    strokeStyle: "rgb(255,0,0)",
    lineWidth: 3,
    ball: null
  };
  
  this.slidePhase = 0;
  this._open = false;
  Widgets.add(this);
}

Piston.prototype.update = function(){
  var self = this;
  if (!this._open) Balls.balls.map(function(x){self.collisionCheck(x);});
  if (this.slidePhase != 0){
    this.performPush();
  } else {
    if (!this._open){
      if (this.door1.ball != null){
        this.door1.ball.location.x = this.location.x+25;
        this.door1.ball.location.y = this.location.y+10;
      }
      if (this.door2.ball != null){
        this.door2.ball.location.x = this.location.x+65;
        this.door2.ball.location.y = this.location.y+10;
      }
    }
  }
  Screen.append(this.pusherHorizontal,1);
  Screen.append(this.pusherVertical,1);
  Screen.append(this.door1,1);
  Screen.append(this.sliderLeft,1);
  Screen.append(this.sliderRight,1);
  Screen.append(this.sliderMid,1);
  Screen.append(this.door2,1);
  Screen.append(this.platform,1);
}

Piston.prototype.collisionCheck = function(ball){
  var motion = {start: ball.lastLocation.add(ball.hitOffset), end: ball.location.add(ball.hitOffset)};
  var surface;
  if ( this.door1.ball == null){
    surface = {start: this.door1.location, end: this.door1.location.add(this.door1.size)}
    var intersect = MotionSurfaceIntersection(motion,surface);
    if (!isNaN(intersect)) this.door1.ball = ball;
  }
  
  if ( this.door2.ball == null){
    surface = {start: this.door2.location, end: this.door2.location.add(this.door2.size)}
    var intersect = MotionSurfaceIntersection(motion,surface);
    if (!isNaN(intersect)) this.door2.ball = ball;
  }
}

Piston.prototype.performPush = function(){
  if (this.slidePhase > 40){
    if (this.door1.ball != null){
      this.door1.ball.location.x = this.location.x + 25;
      this.door1.ball.location.y = this.location.y + 10;
    }
    this.slidePhase = 0;
    return;
  } else if (this.slidePhase > 20){
    var d = 40 - this.slidePhase;
    this.pusherHorizontal.location.x = this.location.x + d;
    this.pusherVertical.location.x = this.location.x + d + 20;
    if (this.door1.ball != null){
      this.door1.ball.location.x = this.location.x + 25 + d;
      this.door1.ball.location.y = this.location.y + 10;
      
      this.sliderLeft.location.x = this.location.x + d + 40;
      this.sliderRight.location.x = this.location.x + d + 60;
      this.sliderMid.location.x = this.location.x + d + 40;
      if (this.door2.ball != null) this.door2.ball = null;
    } else if (this.door2.ball != null){
      this.door2.ball.location.y = this.location.y + 10;
    }
  } else {
    this.pusherHorizontal.location.x = this.location.x + this.slidePhase;
    this.pusherVertical.location.x = this.location.x + this.slidePhase + 20;
    if (this.door1.ball != null){
      this.door1.ball.location.x = this.location.x + 25 + this.slidePhase;
      this.door1.ball.location.y = this.location.y + 10;
      
      this.sliderLeft.location.x = this.location.x + this.slidePhase + 40;
      this.sliderRight.location.x = this.location.x + this.slidePhase + 60;
      this.sliderMid.location.x = this.location.x + this.slidePhase + 40;
      if (this.door2.ball != null){
        this.door2.ball.location.x = this.location.x + 65 + this.slidePhase;
        this.door2.ball.location.y = this.location.y + 10;
      }
    } else if (this.door2.ball != null){
      this.door2.ball.location.y = this.location.y + 10;
    }
  }
  this.slidePhase += 1;
}

Piston.prototype.startSlide = function(){
  if (this.slidePhase == 0) this.slidePhase = 1;;
}

Piston.prototype.open = function(){
  this._open = true;
  this.door1.ball = null;
  this.door2.ball = null;
  this.door1.strokeStyle = "rgb(0,255,0)";
  this.door2.strokeStyle = "rgb(0,255,0)";
}

Piston.prototype.isOpen = function(){
  return this._open;
}

Piston.prototype.close = function(){
  this._open = false;
  this.door1.strokeStyle = "rgb(255,0,0)";
  this.door2.strokeStyle = "rgb(255,0,0)";
}
Piston.prototype.trigger = function(){
  this.performPush();
  var self = this;
  setTimeout(function(){self.open();}, 1100);
  setTimeout(function(){self.close();}, 1250);
}