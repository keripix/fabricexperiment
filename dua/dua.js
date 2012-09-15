(function () {
  var canvas = new fabric.Canvas("bisacanvas",{selection:false}),
      kotak = document.getElementById("kotak"),
      lingkaran = document.getElementById("lingkaran"),
      garis = document.getElementById("garis"),
      width = document.getElementById("width"),
      height = document.getElementById("height"),
      radius = document.getElementById("radius"),
      angle = document.getElementById("angle"),
      top = document.getElementById("top"),
      left = document.getElementById("left"),
      centerTop = canvas.getCenter().top,
      centerLeft = canvas.getCenter().left,
      toFixed = fabric.util.toFixed,
      addListener = fabric.util.addListener;
      
  /**********************************
   * Fungsi-fungsi untuk membuat objek
   *********************************/
      
  function drawRect() {
    var newRect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
      top: centerTop,
      left: centerLeft
    });
    
    canvas.add(newRect);
    canvas.renderAll();
  }
  
  function drawCircle() {
    var newCircle = new fabric.Circle({
      fill: 'green',
      radius: 50,
      top: centerTop,
      left: centerLeft
    });
    
    canvas.add(newCircle);
    canvas.renderAll();
  }
  
  function drawLine() {
    var points = [
        centerLeft - 50,
        centerTop - 50,
        centerLeft + 50,
        centerTop + 50
      ],
      newLine = new fabric.Line(points, {
        fill: 'blue',
        strokeWidth: 5,
      });
    
    canvas.add(newLine);
    canvas.renderAll();
  }
  
  addListener(kotak, 'click', drawRect);
  addListener(lingkaran, 'click', drawCircle);
  addListener(garis, 'click', drawLine);
  
  /***********************************************
   * Bagian controller
   ***********************************************/
  // Ubah objek yang sedang dipilih berdasarkan nilai yang dimasukkan
  function update(e) {
    if (e.keyCode === 13) {
      var selected = canvas.getActiveObject(),
          value = toFixed(e.target.value),
          id = e.target.id;
      
      if (!selected) {
        return;
      }
      
      if (id === 'radius' && selected instanceof fabric.Circle) {
        selected.set(id, value).setCoords();
      } else if (id === 'top' || id === 'left') {
        selected.set(id, value).setCoords();
      } else if (!(selected instanceof fabric.Circle)) {
        selected.set(id, value).setCoords();
      }
      
      canvas.renderAll();
    }
  }
  
  // Update nilai pada input fields
  function updateControl(){
    var selected = canvas.getActiveObject();
    
    if (selected) {
      width.value = selected.get('width') || null;
      height.value = selected.get('height') || null;
      radius.value = selected.get('radius') || null;
      angle.value = selected.get('angle') || null;
      top.value = selected.get('top');
      left.value = selected.get('left');
    }
  }
  
  // pasang eventlistener
  addListener(width, 'keydown', update);
  addListener(height, 'keydown', update);
  addListener(radius, 'keydown', update);
  addListener(top, 'keydown', update);
  addListener(left, 'keydown', update);
  addListener(angle, 'keydown', update);
  
  canvas.observe({
    'object:selected': updateControl
  });
})();