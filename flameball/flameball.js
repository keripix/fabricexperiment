(function () {
  var canvas = new fabric.Canvas('flame',{
        'selection' : false,
        'interactive': false
      }),
      ball,
      colors = ['#FF8000', '#FF8009', '#FFA60B', '#FFBC11', '#FF9D13'],
      color,
      mouseTop = 300,
      mouseLeft = 300;
  
  // cross-browser support
  if (!window.requestAnimationFrame ) {
    window.requestAnimationFrame = (function () {
      return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
        window.setTimeout(callback, 1000 / 60);
      };
    })();
  }
  
  // membuat bolanya
  setInterval(function () {
    var rand = fabric.util.getRandomInt(0, 5);
    
    ball = new fabric.Circle({
      top: mouseTop,
      left: mouseLeft,
      fill: 'orange',
      radius: 30 + rand,
      select: false
    });
    canvas.add(ball);
  }, 60);
  
  // kita akan menggambarkan bolanya sesuai dengan posisi mouse
  canvas.observe({
    'mouse:move': function (e) {
      var point = canvas.getPointer(e.e);
      mouseTop = point.y;
      mouseLeft = point.x;
    }
  });
  
  // animasi bola api
  (function animate() {
    canvas.forEachObject(function (obj) {
      var top = obj.get('top'),
          radius = obj.getRadiusX();
      
      if (radius < 2) {
        canvas.remove(obj);
      } else {
        obj.set('top', top - 3);
        obj.setRadius(radius - 1);
      }
    });
    
    canvas.renderAll();
    window.requestAnimationFrame(animate);
  })();
})();