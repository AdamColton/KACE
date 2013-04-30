<!doctype html>
<html>
  <head>
    <title>And/Or Gate Demo</title>
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
    <script src="scripts/andOrGate.js" type="text/javascript"></script>
    <script src="scripts/label.js" type="text/javascript"></script>
    <script src="scripts/trapdoor.js" type="text/javascript"></script>
    <script>
      var Clear = {
        image: new ResourceManager.image("img/blank.jpg"),
        size: new Vector(800,600),
        location: new Vector(0,0),
        draw: "fixed"
      };
      
      var ball1 = new Ball(100,100);
      var ball2 = new Ball(200,0);
      var andOrGate = new AndOrGate(200, 350);
      var trapdoor = new Trapdoor(270, 380);
      
      function startDemo(){
        var canvas = $("canvas");
        Screen.ctx = $("buffer").getContext("2d");
        Screen.buffer = $("buffer");
        Screen.canvasCtx = canvas.getContext("2d");
        
        input.init(canvas);
        
        ResourceManager.doneLoadingCallback = function(){setInterval( Demo.update, Settings.frameDelay )}
        ResourceManager.sendRequests();
        
        new Ramp(0,100, 215,200);
        new Ramp(800,10, -575,290);
        new Label("OR", 220, 400);
        new Label("AND", 260, 400);
      }
      window.onload = startDemo;
      
      var Demo = {
        update: function(){
          Balls.update();
          Widgets.update();
          if (ball1.location.y > 620){
            ball1.location.x = Math.floor(Math.random()*580+10);
            ball1.location.y = -20;
          }
          if (ball2.location.y > 620){
            ball2.location.x = Math.floor(Math.random()*580+10);
            ball2.location.y = -20;
          }
          Screen.append(Clear, 0);
          Screen.draw();
        }
      }
      
      function toggledoors(){
        if (trapdoor.isOpen()){
          trapdoor.close();
          andOrGate.close();
          $("trapdoorSwitch").innerHTML = "Open Doors";
        } else {
          trapdoor.open();
          andOrGate.open();
          $("trapdoorSwitch").innerHTML = "Close Doors";
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
    <canvas id="buffer" width="800" height="600"></canvas><br />
    <button id="trapdoorSwitch" onclick="toggledoors()">Open Doors</button>
  </body>
</html>