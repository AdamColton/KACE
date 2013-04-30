var Widgets = {
  widgets: new List(),
  add: function (widget){Widgets.widgets.append(widget);},
  update: function(){
    Widgets.widgets.methodMap("update");
    if (this._cascade) {
      this._cascadeLevel += .5;
      var cl = this._cascadeLevel;
      Widgets.widgets.map(function(widget){
        if (widget.location.y == cl) widget.trigger();
      });
      if (this._cascadeLevel == this.cascadeEnd) this._cascade = false;
    }
  },
  _cascade: false,
  cascadeStart: 0,
  cascadeEnd: 600,
  trigger: function(){
    this._cascadeLevel = this.cascadeStart;
    this._cascade = true;
  }
};

function collisionCheck(surface, ball){
  var motion = {start: ball.lastLocation.add(ball.hitOffset), end: ball.location.add(ball.hitOffset)};
  var intersect = MotionSurfaceIntersection(motion,surface);
  if (!isNaN(intersect)){
    var dy = ball.location.subtract(ball.lastLocation).y;
    var v = surface.end.subtract(surface.start).setMagnitude(1);
    if (v.y < 0) v = v.reverse();
    var m = dy * (1-intersect) * v.y;
    ball.location.x = ball.lastLocation.x + m*v.x;
    ball.location.y = ball.lastLocation.y + dy * intersect + m*v.y - 1;
  }
}