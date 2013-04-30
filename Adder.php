<!doctype html>
<html>
  <head>
    <title>Binary Adder</title>
    <script src="scripts/vector.js" type="text/javascript"></script>
    <script src="scripts/linkedList.js" type="text/javascript"></script>
    <script src="scripts/grid.js" type="text/javascript"></script>
    <script src="scripts/sprite.js" type="text/javascript"></script>
    <script src="scripts/main.js" type="text/javascript"></script>
    <script src="scripts/screen.js" type="text/javascript"></script>
    <script src="scripts/input.js" type="text/javascript"></script>
    <script src="scripts/widgets.js" type="text/javascript"></script>
    <script src="scripts/ball.js" type="text/javascript"></script>
    <script src="scripts/ramp.js" type="text/javascript"></script>
    <script src="scripts/toggle.js" type="text/javascript"></script>
    <script>
      var Clear = {
        image: new ResourceManager.image("img/blank.jpg"),
        size: new Vector(800,600),
        location: new Vector(0,0),
        draw: "fixed"
      };
      
      var toggles = [];
      function startDemo(){
        var canvas = $("canvas");
        Screen.ctx = $("buffer").getContext("2d");
        Screen.buffer = $("buffer");
        Screen.canvasCtx = canvas.getContext("2d");
        
        input.init(canvas);
        
        ResourceManager.doneLoadingCallback = function(){setInterval( Demo.update, Settings.frameDelay )}
        ResourceManager.sendRequests();
        
        for(var i=0; i<10; i++){
          toggles[i] = new Toggle(700-(i*30), 100+(i*50));
        }
      }
      window.onload = startDemo;
      
      var Demo = {
        update: function(){
          Balls.update();
          Balls.balls.filter( function(ball){return ball.location.y > 620;} ).map(function(ball){Balls.balls.remove(ball);});
          Widgets.update();
          Screen.append(Clear, 0);
          Screen.draw();
        }
      }
      
      function addBalls(){
        var v = parseInt($("inputVal").value)
        if (v < 1 || v > 1023) return;
        var i = 1024;
        var p = 360;
        while(i>0){
          p += 30;
          if (i <= v){
            new Ball(p,10);
            v -= i;
          }
          i = i >> 1;
        }
      }
      
      function clearToggles(){
        var cascade = false;
        for(var i=0; i<toggles.length; i++){
          if ( (!toggles[i].left && !cascade) || (toggles[i].left && cascade) ){
            cascade = true;
            new Ball(700-(i*30)-10,10);
          }
        }
      }
    </script>
    <style>
      #buffer{
        display: none;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="800" height="600"></canvas>
    <canvas id="buffer" width="800" height="600"></canvas>
    <br />
    <input type="text" id="inputVal" />(add a number 1-1023)<button onclick="addBalls()">Go</button><br />
    <button onclick="clearToggles()">Clear</button>
  </body>
</html>