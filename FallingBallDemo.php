<!doctype html>
<html>
  <head>
    <title>Falling Ball Demo</title>
    <script src="scripts/vector.js" type="text/javascript"></script>
    <script src="scripts/linkedList.js" type="text/javascript"></script>
    <script src="scripts/grid.js" type="text/javascript"></script>
    <script src="scripts/sprite.js" type="text/javascript"></script>
    <script src="scripts/main.js" type="text/javascript"></script>
    <script src="scripts/screen.js" type="text/javascript"></script>
    <script src="scripts/input.js" type="text/javascript"></script>
    <script src="scripts/ball.js" type="text/javascript"></script>
    <script>
      var Clear = {
        image: new ResourceManager.image("img/blank.jpg"),
        size: new Vector(800,600),
        location: new Vector(0,0),
        draw: "fixed"
      };
      
      var ball = new Ball(100,100);
      
      function startDemo(){
        var canvas = $("canvas");
        Screen.ctx = $("buffer").getContext("2d");
        Screen.buffer = $("buffer");
        Screen.canvasCtx = canvas.getContext("2d");
        
        input.init(canvas);
        
        ResourceManager.doneLoadingCallback = function(){setInterval( Demo.update, Settings.frameDelay )}
        ResourceManager.sendRequests();
      }
      window.onload = startDemo;
      
      var Demo = {
        update: function(){
          var test = {
            draw: "fixedtext",
            font: "20pt Arial",
            color: "black",
            text: "This is a test",
            location: new Vector(100,100)
          };
          Balls.update();
          if (ball.location.y > 620){
            ball.location.x = Math.floor(Math.random()*580+10);
            ball.location.y = -20;
          }
          Screen.append(test, 1);
          Screen.append(Clear, 0);
          Screen.draw();
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
  </body>
</html>