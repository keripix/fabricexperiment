(function () {
  var canvas = new fabric.Canvas('bisacanvas'),
      kotak = document.getElementById('rect'),
      lingkaran = document.getElementById('circle'),
      garis = document.getElementById('line'),
      gambar = document.getElementById('image'),
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
  addListener(garis, 'click', create);
  addListener(gambar, 'click', create);
  
  function activateDrawing(params) {
    canvas.defaultCursor = 'crosshair';
    
    if (params.type === 'rect') {
      drawing = new Rectangle();
    } else if (params.type === 'circle') {
      drawing = new Circle();
    } else if (params.type === 'line') {
      drawing = new Line();
    } else if (params.type === 'image') {
      drawing = new FImage();
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
    
    instance.setCoords();
    
    instance = null;
    drawing = null;
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
    }
    /*,
    {
      top: point.y,
      left: point.x,
      height: 4,
      width: 4
    }*/);
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
  
  /******************************************
   * OBJEK UNTUK GARIS LURUS
   ******************************************/
  
  function Line(params) {
    
  }
  
  Line.prototype.create = function (e) {
    var point = canvas.getPointer(e.e),
        coords = [
          point.x,
          point.y,
          point.x + 1,
          point.y + 1
        ];
    
    instance = new fabric.Line(coords, {
      strokeWidth: 5,
      fill: 'yellow'
    });
    
    canvas.add(instance);
    canvas.renderAll();
  }
  
  Line.prototype.update = function (e) {
    if (instance instanceof fabric.Line) {
      
      var point = canvas.getPointer(e.e),
          x1 = instance.get('x1'),
          x2 = point.x,
          y1 = instance.get('y1'),
          y2 = point.y;
        
      if (x2 < x1) {
        x2 = x1;
        x1 = point.x;
      }
      
      if (y2 < y1) {
        y2 = y1;
        y1 = point.y;
      }
      
      instance.set({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      });
      
      canvas.renderAll();
    }
  }
  
})();