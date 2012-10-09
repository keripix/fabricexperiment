(function () {
  var canvas = new fabric.Canvas('bisacanvas', {
        selection: false // nonaktifkan pemilihan objek secara group
      }),
      kotak = document.getElementById('rect'),
      lingkaran = document.getElementById('circle'),
      gambar = document.getElementById('image'),
      sketch = document.getElementById('sketch'),
      addListener = fabric.util.addListener,
      drawing,
      instance;
  
  // yang dijalankan ketika tombol objek ditekan
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
  
  /**
   * Menginisiasi objek yang akan mengatur proses pelukisan
   */
  function activateDrawing(params) {
    
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
      // Tiap instanta dari Rectangle, Circle, FImage dan Sketch memiliki
      // 2 metode yang sama, yaitu update dan create
      canvas.observe({
        // mengupdate ukuran objek fabric sesuai dengan posisi mouse
        'mouse:move': drawing.update,
        
        // membuat objek fabric yang hendak dilukis
        'mouse:down': drawing.create,
        
        // berhenti melukis
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
      // khusus untuk sketch, variabel instance akan tetap bernilai null,
      // sehingga kita perlu menanganinay disini
      canvas.isDrawingMode = false;
    }
    
    drawing = null;
  }
  
  /*******************************************
   * OBJEK SKETSA
   *******************************************/
  
  function Sketch() {
    canvas.defaultCursor = 'crosshair';
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
    canvas.defaultCursor = 'crosshair';
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
    console.log(instance.get('oCoords'));
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
    canvas.defaultCursor = 'crosshair';
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
      canvas.defaultCursor = 'crosshair';
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
      
      // Dapatkah pembaca memahami mengapa kita perlu melakukan pendekatan
      // seperti ini?
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