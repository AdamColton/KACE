<html>
  <head>
    <title>Vector Intersection Test</title>
  </head>
  <body id="body">
  </body>
  <script src="scripts/vector.js" type="text/javascript"></script>
  <script>
    var $=function(elId){return document.getElementById(elId);}
    
    //simple intersection
    var s = {start: new Vector(1,3), end: new Vector(3,1)};
    var m = {start: new Vector(1,1), end: new Vector(2,3)};
    $("body").innerHTML += MotionSurfaceIntersection(m,s) + "<br />";
    
    //intersection with motion slope of zero
    var s = {start: new Vector(1,1), end: new Vector(1,3)};
    var m = {start: new Vector(0,2), end: new Vector(2,2)};
    $("body").innerHTML += MotionSurfaceIntersection(m,s) + "<br />";
    
    //should excercise (dS.x - (dM.x*dS.y/dM.y)
    var m = {start: new Vector(1,1), end: new Vector(2,2)};
    var s = {start: new Vector(2,1), end: new Vector(1,2)};
    $("body").innerHTML += MotionSurfaceIntersection(m,s) + "<br />";
    
    //real example
    var m = {start: new Vector(362,180), end: new Vector(362,190)};
    var s = {start: new Vector(100,100), end: new Vector(400,200)};
    var i = MotionSurfaceIntersection(m,s);
    $("body").innerHTML += i + "<br />";
    
    //horizontal example
    var m = {start: new Vector(110,90), end: new Vector(110,110)};
    var s = {start: new Vector(100,100), end: new Vector(120,100)};
    var i = MotionSurfaceIntersection(m,s);
    $("body").innerHTML += i + "<br />";
  </script>
</html>