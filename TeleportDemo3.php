<!doctype html>
<html>
  <head>
    <title>For Fun Teleporter</title>
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
    <script src="scripts/teleport.js" type="text/javascript"></script>
    <script>
      var Clear = {
        image: new ResourceManager.image("img/blank.jpg"),
        size: new Vector(800,600),
        location: new Vector(0,0),
        draw: "fixed"
      };     
      
      function startDemo(){
        var canvas = $("canvas");
        Screen.ctx = $("buffer").getContext("2d");
        Screen.buffer = $("buffer");
        Screen.canvasCtx = canvas.getContext("2d");
        
        input.init(canvas);
        
        ResourceManager.doneLoadingCallback = function(){setInterval( Demo.update, Settings.frameDelay ); setInterval(AddBall, 100);}
        ResourceManager.sendRequests();
        
        for(var i=0; i<20; i++){
          new Teleporter(Math.random()*800, Math.random()*300 + 300, Math.random()*800, Math.random()*300);
        }
      }
      window.onload = startDemo;
      
      var Demo = {
        update: function(){
          Balls.update();
          Widgets.update();
          Screen.append(Clear, 0);
          Screen.draw();
        }
      }
      
      function AddBall(){
        new Ball(Math.random() * 790 + 5, -10);
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
  </body>
</html>