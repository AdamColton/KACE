function Vector(x,y){
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(other){
  return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.reverse = function(other){
  this.x = -this.x;
  this.y = -this.y;
  return this;
}

Vector.prototype.toInts = function(){
  return new Vector(Math.round(this.x), Math.round(this.y));
};

Vector.prototype.subtract = function(other){
  return new Vector(this.x - other.x, this.y - other.y);
};

Vector.prototype.angle = function(){
  return Math.atan2(this.x, this.y);
};

Vector.prototype.rotate = function(angle){
  angle += this.angle();
  var magnitude = this.magnitude();
  this.x = Math.sin(angle) * magnitude;
  this.y = Math.cos(angle) * magnitude;
  return this;
};

Vector.prototype.setMagnitude = function(m){
  if (this.magnitude() === 0){
    this.x = 0;
    this.y = 0;
  } else {
    var d = m / this.magnitude();
    this.x *= d;
    this.y *= d;
  }
  return this;
};

Vector.prototype.magnitude = function(){
  return Math.sqrt(this.x*this.x + this.y*this.y);
};

Vector.prototype.divideByNumber = function(n){
  return new Vector(this.x/n, this.y/n);
};

Vector.prototype.arr = function(){
  return [this.x, this.y];
};

Vector.prototype.isEqual = function(other){
  return this.x == other.x && this.y == other.y;
};

function Polar(magnitude, angle){
  return new Vector(Math.sin(angle) * magnitude, Math.cos(angle) * magnitude);
}

function Distance(v1, v2){
  return Math.sqrt((v1.x-v2.x)*(v1.x-v2.x) + (v1.y-v2.y)*(v1.y-v2.y));
}

//Finds the point in time when a line segment, representing motion
//will intersect a line segment representing a surface
//The return value is a float where 0 is the begining of the motion
//and 1 is the end of the motion. If no collision occures in the timeframe
//NaN is returned.

//motion and surface both need to have start and end vectors.
//M is the time when the motion intersects the surface and S is the
//percentage along the surface where the motion intersects
function MotionSurfaceIntersection(motion, surface){ 
  var dM = motion.end.subtract(motion.start);
  var dS = surface.end.subtract(surface.start);
  var S, M;
  if (dM.y == 0){
    if (dS.y == 0){
      if (motion.start.y != surface.start.y || dS.x == dM.x ) return NaN; //legitimate exit
      S = (motion.start.x - surface.start.x) / (dS.x - dM.x);
      M = S;
    } else {
      if (dM.x == 0){
        if (motion.start.x == surface.start.x && motion.start.y == surface.start.y){
          return 0;
        } else {
          return NaN; //legitimate exit
        }
      }
      if (dS.y == 0) return NaN;
      S = (motion.start.y - surface.start.y) / dS.y;
      M = (surface.start.x + S*dS.x - motion.start.x) / dM.x;
    }
  } else {
    if (dS.y == 0){
      M = (surface.start.y - motion.start.y) / dM.y;
      S = (motion.start.x + M*dM.x - surface.start.x) / dS.x;
    } else {
      if ((dM.x/dM.y) == (dS.x/dS.y)){
        //if it collides, it will collide everywhere so we need to find which end is hit first
        return "slopes are equal";
      }
      S = ( (dM.x/dM.y) * (surface.start.y-motion.start.y) - surface.start.x + motion.start.x) / (dS.x - (dM.x*dS.y/dM.y));
      M = (surface.start.y + S*dS.y - motion.start.y) / dM.y;
    }
  }
  if (S >=0 && S <= 1 && M >= 0 && M <= 1) return M;
  return NaN;
}