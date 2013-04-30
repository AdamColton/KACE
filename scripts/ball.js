var Balls = {
  bottom: 1000,
  balls: new List(),
  remove: new List(),
  update: function(){
    this.balls.methodMap("update");
    this.remove.map(function(ball){
      Balls.balls.remove(ball);
    });
    this.remove = new List();
  }
}

function Ball(x,y){
  this.location = new Vector(x,y);
  Balls.balls.append(this);
}

Ball.prototype.image = new ResourceManager.image("img/ball.png");
Ball.prototype.size = new Vector(10,10);
Ball.prototype.hitOffset = new Vector(5,10);
Ball.prototype.update = function(){
  this.lastLocation = new Vector(this.location.x,this.location.y);
  this.location.y += 10;
  Screen.append(this,1);
  if (this.location > Balls.bottom) this.remove();
}
Ball.prototype.remove = function(){
  Balls.remove.append(this);
}