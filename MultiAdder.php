<!doctype html>
<html>
  <head>
    <title>Multi Adder</title>
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
    <script src="scripts/trash.js" type="text/javascript"></script>
    <script src="scripts/andOrGate.js" type="text/javascript"></script>
    <script src="scripts/trapdoor.js" type="text/javascript"></script>
    <script src="scripts/piston.js" type="text/javascript"></script>
    <script src="scripts/teleport.js" type="text/javascript"></script>
    <script src="scripts/label.js" type="text/javascript"></script>
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
        
        ResourceManager.doneLoadingCallback = function(){setInterval( Demo.update, Settings.frameDelay );}
        ResourceManager.sendRequests();
        
        for(var i=0; i < 3 ; i++){
          var dx = i * -100;
          var dy = i * 130;
          new AndOrGate(580 + dx, 50 + dy);
          new AndOrGate(640 + dx, 80 + dy);
          new AndOrGate(700 + dx, 110 + dy);
          new Trash(770 + dx, 155 + dy);
          new Piston(540 + dx, 120 + dy);
          new Teleporter(670 + dx,115 + dy, 570 + dx,120 + dy);
          new Trash(625 + dx, 155 + dy);
          new Teleporter(610 + dx,155 + dy,730 + dx,160 + dy);
          new Ramp(580 + dx, 145 + dy, -80, 30);
          new Trapdoor(730 + dx,500)
          new Label(""+Math.pow(2,i), 725 + dx,520);
        }
      }
      new Ramp(290, 450, 130, 50);
      new Trapdoor(430, 500)
      new Label("8", 425, 520);
      window.onload = startDemo;
      
      var Demo = {
        update: function(){
          Balls.update();
          Widgets.update();
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
    <canvas id="buffer" width="800" height="600"></canvas><br />
    <button onclick="Widgets.trigger()">Go</button><br />
    <button onclick="new Ball(590,10);">1</button>
    <button onclick="new Ball(490,10);">2</button>
    <button onclick="new Ball(390,10);">4</button>
  </body>
</html>