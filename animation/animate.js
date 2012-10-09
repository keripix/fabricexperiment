(function () {
  var canvas = new fabric.Canvas('bisacanvas', {
        selection: false
      }),
      top = 50,
      radius = 50,
      curTop,
      circle,
      circles = [],
      objectId = 0,
      canvasHeight = canvas.getHeight(),
      invoke = fabric.util.array.invoke,
      ease = [
        fabric.util.ease.easeInBack,
        fabric.util.ease.easeInExpo,
        fabric.util.ease.easeInBounce,
        fabric.util.ease.easeInElastic,
        fabric.util.ease.easeInQuad
      ],
      iter = 0;
 
  for (curTop = top; curTop < canvasHeight; curTop += (radius * 2) + 20) {
    circle = new fabric.Circle({
      top: curTop,
      left: 50,
      radius: radius,
      fill: 'purple'
    });
    circle.objectId = objectId;
    objectId += 1;
    canvas.add(circle);
    circles.push(circle);
  }
  
  canvas.renderAll();
  
  function animateCircle(item, easeMethod, to, doRender) {
    item.animate('left', to, {
      duration: 2000,
      easing: easeMethod,
      onChange: function () {
        if (item.objectId === 1) {          
          canvas.renderAll();
        }
      },
      onComplete: function () {
        to = 600 - to;
        animateCircle(item, easeMethod, to);
      }
    });
  }
  
  animateCircle(circles[0], ease[0], 550, false);
  animateCircle(circles[1], ease[1], 550, true);
  /*
  circles.forEach(function (item) {
    animateCircle(item, fabric.util.ease.easeInBack, 550);
    iter += 1;
  });
  */
  
})();