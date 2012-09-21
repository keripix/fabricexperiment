(function () {
  var canvas = new fabric.Canvas('bisacanvas', {
        selection: false
      }),
      kotak = document.getElementById('rect'),
      lingkaran = document.getElementById('circle'),
      gambar = document.getElementById('image'),
      sketch = document.getElementById('sketch'),
      addListener = fabric.util.addListener,
      drawing,
      instance;
  
  function create(e) {
    var id = e.target.id;
    
    activateDrawing({
      type: id
    });
  }
  
  addListener(kotak, 'click', create);
  addListener(lingkaran, 'click', create);
  addListener(sketch, 'click', create);
  addListener(gambar, 'click', create);
  
  function activateDrawing(params) {
    canvas.defaultCursor = 'crosshair';
    
    if (params.type === 'rect') {
      drawing = new Rectangle();
    } else if (params.type === 'circle') {
      drawing = new Circle();
    } else if (params.type === 'image') {
      drawing = new FImage();
    } else if (params.type === 'sketch') {
      drawing = new Sketch();
    }
    
    if (drawing) {
      canvas.observe({
        'mouse:move': drawing.update,
        'mouse:down': drawing.create,
        'mouse:up': stopDrawing
      });
    }
  }
  
  function stopDrawing() {
    canvas.defaultCursor = 'default';
    
    canvas.stopObserving('mouse:move', drawing.update);
    canvas.stopObserving('mouse:down', drawing.create);
    canvas.stopObserving('mouse:up', stopDrawing);
    
    if (instance instanceof fabric.Object) {
      instance.setCoords();
      instance = null;
    } else {
      canvas.isDrawingMode = false;
    }
    
    drawing = null;
  }
  
  /*******************************************
   * OBJEK SKETSA
   *******************************************/
  
  function Sketch() {
    canvas.freeDrawingColor = 'back';
    canvas.freeDrawingLineWidth = 10;
    canvas.isDrawingMode = true;
  }
  
  Sketch.prototype.create = function (e) {
    
  }
  
  Sketch.prototype.update = function (e) {
    
  }
  
  /*******************************************
   * OBJEK UNTUK KOTAK
   ******************************************/
  function Rectangle() {
    
  }
  
  Rectangle.prototype.create = function (e) {
    var point = canvas.getPointer(e.e);
    instance = new fabric.Rect({
      fill: 'red',
      width: 2,
      height: 2,
      top: point.y,
      left: point.x
    });    
    
    canvas.add(instance);
    canvas.renderAll();
  }
  
  Rectangle.prototype.update = function (e) {
    if (instance instanceof fabric.Rect) {
      var topLeft = instance.get('oCoords').tl,
          point = canvas.getPointer(e.e),
          width = point.x - topLeft.x,
          height = point.y - topLeft.y,
          top = height / 2 + topLeft.y,
          left = width / 2 + topLeft.x;
      
      instance.set({
        top: top,
        left: left,
        width: Math.abs(width),
        height: Math.abs(height)
      });
      
      canvas.renderAll();
    }
  }
  
  /******************************************
   * OBJEK UNTUK LINGKARAN
   *****************************************/
  function Circle() {
    
  }
  
  Circle.prototype.create = function (e) {
    var point = canvas.getPointer(e.e);
    
    instance = new fabric.Circle({
      fill: 'blue',
      radius: 3,
      top: point.y,
      left: point.x
    });
    
    canvas.add(instance);
    canvas.renderAll();
  }
  
  Circle.prototype.update = function (e) {
    if (instance instanceof fabric.Circle) {
      var point = canvas.getPointer(e.e),
          top = instance.get('top'),
          left = instance.get('left'),
          radius = Math.sqrt(Math.pow(point.x - left, 2) + Math.pow(point.y - top, 2));
          
      instance.setRadius(radius);
      canvas.renderAll();
    }
  }
  
  /******************************************
   * OBJEK UNTUK GAMBAR
   ******************************************/
  function FImage(params) {
    
  }
  
  FImage.prototype.create = function (e) {
    var point = canvas.getPointer(e.e);
    
    fabric.Image.fromURL('kucing.jpg', function (img) {
      instance = img;
      instance.set({
        top: point.y,
        left: point.x,
        height: 4,
        width: 4
      });
      instance.setCoords();
      canvas.add(instance);
      canvas.renderAll();
    });
  }
  
  FImage.prototype.update = function (e) {
    if (instance instanceof fabric.Image) {
      var point = canvas.getPointer(e.e),
          topLeft = instance.get('oCoords').tl,
          width = Math.abs(point.x - topLeft.x),
          height = Math.abs(point.y - topLeft.y),
          top,
          left;
          
      if (point.x < topLeft.x && point.y < topLeft.y) {
        top = height / 2 + point.y;
        left = width / 2 + point.x;
      } else if (point.x < topLeft.x) {
        top = height / 2 + topLeft.y;
        left = width / 2 + point.x;
      } else if (point.y < topLeft.y) {
        top = height / 2 + point.y;
        left = width / 2 + topLeft.x;
      } else {
        top = height / 2 + topLeft.y;
        left = width / 2 + topLeft.x;
      }
      
      instance.set({
        top: top,
        left: left,
        width: width,
        height: height
      });
      
      canvas.renderAll();
    }
  }
})();