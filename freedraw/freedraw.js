(function () {
  var canvas = new fabric.Canvas('bisacanvas'),
      kotak = document.getElementById('rect'),
      addListener = fabric.util.addListener,
      drawing,
      instance;
    
  addListener(kotak, 'click', create);
  
  function create(e) {
    var id = e.target.id;
    
    activateDrawing({
      type: id
    });
  }
  
  function activateDrawing(params) {
    canvas.defaultCursor = 'crosshair';
    
    if (params.type === 'rect') {
      drawing = new Rectangle();
    } else if (params.type === 'circle') {
      drawing = new Circle();
    } else if (params.type === 'line') {
      drawing = new Line();
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
    if (instance instanceof fabric.Object) {
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
  
  Circle.prototype.create = function () {
    
  }
  
  Circle.prototype.update = function () {
    
  }
  
  /******************************************
   * OBJEK UNTUK GAMBAR
   ******************************************/
  
  function FImage(params) {
    this.fill = params.fill || 'blue';
    this.originalWidth = 5;
    this.originalHeight = 5;
    this.instance = undefined;
  }
  
  FImage.prototype.create = function () {
    
  }
  
  FImage.prototype.update = function () {
    
  }
  
  /******************************************
   * OBJEK UNTUK GARIS LURUS
   ******************************************/
  
  function Line(params) {
    this.fill = params.fill || 'yellow';
    this.originalWidth = 5;
    this.originalHeight = 5;
    this.strokeWidth = 10;
    this.instance = undefined;
  }
  
  Line.prototype.create = function () {
    
  }
  
  Line.prototype.update = function () {
    
  }
  
})();