var CanvasHelper = function(){
    
    var canvas; 
    var context;

    var clickX = [];
    var clickY = [];
    var clickDrag = [];
    var isPainting;

    var remoteClickX = [];
    var remoteClickY = [];
    var remoteClickDrag = [];

    function init(){
        canvas = document.getElementById("maincanvas");
        context = document.getElementById("maincanvas").getContext("2d");
        setHandlers();
    }

    function getCanvas(){
        if(canvas != undefined)
           return canvas;
        else
            return document.getElementById("maincanvas");
    }

    function getContext(){
        if(context != undefined)
            return context;
        else
            return document.getElementById("maincanvas").getContext("2d");
    }

    function setHandlers(){
        var can = getCanvas();
        can.addEventListener("mousedown", function(e){
                var mouseX = e.pageX - this.offsetLeft;
                var mouseY = e.pageY - this.offsetTop;

                isPainting = true;
                addPaint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                redraw();
            });
        can.addEventListener("mousemove", function(e){
              if(isPainting){
                addPaint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
              }
            });

        can.addEventListener("mouseup", function(e){
           isPainting = false; 
        });

        can.addEventListener("mouseleave", function(e){
            isPainting = false;
        });

    }
        
    function addPaint(x, y, dragging){
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        var data = { type: "draw", x: x, y: y, dragging: dragging ? "true" : "false"};
        ConnectionHelper.send(data);
    }

    function addPaintRemote(x, y, dragging){
        remoteClickX.push(x);
        remoteClickY.push(y);
        remoteClickDrag.push(dragging);
        redrawRemote();
    }

    function redraw(){
      //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

      context.strokeStyle = "#000";
      context.lineJoin = "round";
      context.lineWidth = 2;

      for(var i=0; i < clickX.length; i++) {		
        context.beginPath();

        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
          context.moveTo(clickX[i]-1, clickY[i]);
        }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.stroke();
      }
    }

    function redrawRemote(){
      //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

      context.strokeStyle = "#000";
      context.lineJoin = "round";
      context.lineWidth = 2;

      for(var i=remoteClickX.length; i > 0; i--) {		
        context.beginPath();

        if(!remoteClickDrag[i] && i){
          context.moveTo(remoteClickX[i-1], remoteClickY[i-1]);
        }else{
          context.moveTo(remoteClickX[i]-1, remoteClickY[i]);
        }
         context.lineTo(remoteClickX[i], remoteClickY[i]);
         context.closePath();
         context.stroke();
      }

    }

    function clearCanvas(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.stroke();
    }

    return {
        init : init,
        clearCanvas : clearCanvas,
        getCanvas: getCanvas,
        addPaintRemote: addPaintRemote,
    }
}();