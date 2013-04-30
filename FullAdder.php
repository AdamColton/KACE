<!doctype html>
<html>
  <head>
    <title>Full Adder</title>
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
      
      var Gates = [new AndOrGate(100,100), new AndOrGate(160,130), new AndOrGate(220,160)];
      new Trash(285, 205);
      new Teleporter(190,165,90,195);
      var piston = new Piston(60,200);
      new Trash(150, 240);
      new Teleporter(130,250,250,270);
      var Doors = [new Trapdoor(90,400), new Trapdoor(250,400)];
      new Label("CARRY", 75,420);
      new Label("OUT", 230,420);      
      
      function startDemo(){
        var canvas = $("canvas");
        Screen.ctx = $("buffer").getContext("2d");
        Screen.buffer = $("buffer");
        Screen.canvasCtx = canvas.getContext("2d");
        
        input.init(canvas);
        
        ResourceManager.doneLoadingCallback = function(){setInterval( Demo.update, Settings.frameDelay );}
        ResourceManager.sendRequests();
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
        new Ball(105,-10);
      }
      
      function Go(){
        Gates[0].open();
        Gates[1].open();
        Gates[2].open();
        setTimeout( step2, 150);
      }
      function step2(){
        Gates[0].close();
        Gates[1].close();
        Gates[2].close();
        setTimeout( step3, 300);
      }
      function step3(){
        piston.startSlide();
        setTimeout( step4, 1000);
      }
      function step4(){
        piston.open();
        setTimeout( step5, 1000);
      }
      function step5(){
        piston.close();
      }
      
      function clearOutput(){
        Doors[0].open();
        Doors[1].open();
        setTimeout(resetDoors, 150);
      }
      function resetDoors(){
        Doors[0].close();
        Doors[1].close();
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
    <button onclick="AddBall()">Add Ball</button><button onclick="Go()">Go</button><button onclick="clearOutput()">Clear Output</button>
  </body>
</html>