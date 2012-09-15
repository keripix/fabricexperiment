(function () {
  var canvas = new fabric.Canvas("bisacanvas"),
      kotak = document.getElementById("kotak"),
      lingkaran = document.getElementById("lingkaran"),
      garis = document.getElementById("garis"),
      panjang = document.getElementById("panjang"),
      lebar = document.getElementById("lebar"),
      radius = document.getElementById("radius"),
      topControl = document.getElementById("top"),
      leftControl = document.getElementById("left"),
      top = canvas.getCenter().top,
      left = canvas.getCenter().left;
      
  /**********************************
   * Fungsi-fungsi untuk membuat objek
   *********************************/
      
  function drawRect() {
    var newRect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
      top: top,
      left: left
    });
    
    canvas.add(newRect);
    canvas.renderAll();
  }
  
  function drawCircle() {
    var newCircle = new fabric.Circle({
      fill: 'green',
      radius: 50,
      top: top,
      left: left
    });
    
    canvas.add(newCircle);
    canvas.renderAll();
  }
  
  function drawLine() {
    var points = [
        left - 50,
        top - 50,
        left + 50,
        top + 50
      ],
      newLine = new fabric.Line(points, {
        fill: 'blue',
        strokeWidth: 5,
      });
    
    canvas.add(newLine);
    canvas.renderAll();
  }
  
  kotak.addEventListener('click', drawRect, false);
  lingkaran.addEventListener('click', drawCircle, false);
  garis.addEventListener('click', drawLine, false);
  
  /***********************************************
   * Bagian controller
   ***********************************************/
  function getSelectedObjects() {
    return canvas.getActiveObject() ||
      (canvas.getActiveGroup() ? canvas.getActiveGroup().getObjects() : null);
  }
  
  function updateWidth(e) {
    if (e.keyCode === 13) {
      var selected = getSelectedObjects();
      
      if (selected instanceof fabric.Object) {
        selected.set('width', e.target.value).setCoords();
      } else {
        selected.forEach(function (item) {
          item.set('width', e.target.value).setCoords();
        });
      }
      
      canvas.renderAll();
    }
  }
  
  function updateHeight(e) {
    if (e.keyCode === 13) {
      var selected = getSelectedObjects();
      
      if (selected instanceof fabric.Object) {
        selected.set('height', e.target.value).setCoords();
      } else {
        selected.forEach(function (item) {
          item.set('height', e.target.value).setCoords();
        });
      }
      
      canvas.renderAll();
    }
  }
  
  panjang.addEventListener('keydown', updateWidth, false);
  lebar.addEventListener('keydown', updateHeight, false);
})();