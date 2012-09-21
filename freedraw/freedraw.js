(function () {
  var canvas = new fabric.Canvas('bisacanvas'),
      kotak = document.getElementById('kotak'),
      addListener = fabric.util.addListener,
      isDrawing = false,
      drawing,
      instance;
    
  addListener(kotak, 'click', create);
  
  function create(e) {
    var id = e.target.id;
    
    if (id === 'kotak') {
      activateDrawing({
        type: 'rect'        
      });      
    }
  }
  
  function activateDrawing(params) {
    canvas.defaultCursor = 'crosshair';
    
    if (params.type === 'rect') {
      drawing = new Rectangle();
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
    
    isDrawing = false;
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
    isDrawing = true;
  }
  
  Rectangle.prototype.update = function (e) {
    if (isDrawing) {
      var topLeft = instance.get('oCoords').tl,
          currentTop = instance.get('top'),
          currentLeft = instance.get('Left'),
          currentHeight = instance.getHeight(),
          currentWidth = instance.getWidth(),
          width,
          height,
          top,
          left,
          point = canvas.getPointer(e.e);
          
      width = point.x - topLeft.x;
      height = point.y - topLeft.y;
      top = height / 2 + topLeft.y;
      left = width / 2 + topLeft.x;
      
      instance.set({
        top: top,
        left: left      
      });
      
      instance.setWidth(Math.abs(width));
      instance.setHeight(Math.abs(height));
      instance.setCoords();
      
      canvas.renderAll();
    }
  }
  
  /******************************************
   * OBJEK UNTUK LINGKARAN
   *****************************************/
  function Circle() {
    this.fill = params.fill || 'red';
    this.originalWidth = 5;
    this.originalHeight = 5;
    this.instance = undefined;
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