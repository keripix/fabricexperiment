(function () {
  // inisiasi canvas, dan membaca elemen
  var canvas = new fabric.Canvas("bisacanvas", {
        selection: false // grouping di non-aktifkan
      }),
      kotak = document.getElementById("kotak"),
      lingkaran = document.getElementById("lingkaran"),
      garis = document.getElementById("garis"),
      gambar = document.getElementById("gambar"),
      width = document.getElementById("width"),
      height = document.getElementById("height"),
      radius = document.getElementById("radius"),
      angle = document.getElementById("angle"),
      top = document.getElementById("top"),
      left = document.getElementById("left"),
      opacity = document.getElementById("opacity"),
      backgroundImage = document.getElementById("backgroundImage"),
      centerTop = canvas.getCenter().top, // top untuk tengah canvas
      centerLeft = canvas.getCenter().left, // left untuk tengah canvas
      toFixed = fabric.util.toFixed, // fungsi helper
      addListener = fabric.util.addListener; // fungsi helper
      
  /**********************************
   * Fungsi-fungsi untuk membuat objek
   *********************************/
  
  // membuat kotak    
  function drawRect() {
    var newRect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
      top: centerTop,
      left: centerLeft
    });
    
    // pasang pada canvas
    canvas.add(newRect).renderAll();
  }
  
  function drawCircle() {
    var newCircle = new fabric.Circle({
      fill: 'green',
      radius: 50,
      top: centerTop,
      left: centerLeft
    });
    
    canvas.add(newCircle).renderAll();
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
          strokeWidth: 5, // tebal garis
        });
    
    canvas.add(newLine).renderAll();
  }
  
  function drawImg() {
    // Baca terlebih dahulu gambar pada alamat yang telah
    // diberikan, kemudian buat objek fabric.Image dar
    // data tersebut.
    //
    // Setelah objek terbaca dan terbuat, maka fungsi callback
    // yang telah ditentukan akan dijalankan. Fungsi callback
    // tersebut menerima argumen berupa instanta dari
    // objek fabric.Image
    fabric.Image.fromURL('kucing.jpg', function (img) {
      img.set({
        top: centerTop,
        left: centerLeft,
        width: 300,
        height: 300
      });
      canvas.add(img).renderAll();
    });
  }
  
  addListener(kotak, 'click', drawRect);
  addListener(lingkaran, 'click', drawCircle);
  addListener(garis, 'click', drawLine);
  addListener(gambar, 'click', drawImg);
  
  /***********************************************
   * Bagian controller
   ***********************************************/
  
  // Ubah objek yang sedang dipilih berdasarkan nilai yang dimasukkan
  // sengaja dibuat 1 fungsi besar
  function update(e) {
    // hanya akan lanjut bila tombol keyboard yang ditekan adalah
    // ENTER
    if (e.keyCode === 13) {
      // mengambil objek yang sedag aktif. Objek yang aktif adalah
      // objek yang sedang terpilih.
      var selected = canvas.getActiveObject(),
          value = toFixed(e.target.value, 2),
          id = e.target.id;
      
      // fail early bila tidak ada yg terpilih
      if (!selected) {
        return;
      }
      
      if (id === 'radius' && selected instanceof fabric.Circle) {
        // bila yang berubah adalah nilai radius
        // dan objek yang terpilih adalah lingkaran
        selected.setRadius(value);
      } else if (id === 'top' || id === 'left') {
        // bila yang berubah adalah nilai top atau left
        selected.set(id, value).setCoords();
      } else if (id === 'opacity') {
        // nilai opacity (transparansi) berkisar dari
        // 0 hingga 1
        if (value >= 0 && value <= 1) {
          selected.setOpacity(value);
        }
      } else if (!(selected instanceof fabric.Circle)) {
        // bila yang berubah adalah nilai selain properti pada
        // kondisi sebelumnya, dan objek yang terpilih
        // bukanlah lingkaran
        selected.set(id, value).setCoords();
      }
      
      // Jangan lupa ini
      canvas.renderAll();
    }
  }
  
  // Update nilai pada input fields
  function updateControl() {
    // membaca objek yang sedang aktif
    var selected = canvas.getActiveObject();
    
    // bila objek ada
    if (selected) {
      // melakukan pembacaan properti dari objek yang terpilih,
      // kemudian nilainya ditampilkan pada field yang bersangkutan
      width.value = selected.getWidth() || null;
      height.value = selected.getHeight() || null;
      angle.value = selected.getAngle();
      top.value = selected.get('top');
      left.value = selected.get('left');
      opacity.value = selected.get('opacity');
      
      /**
       * hanya membaca radius bila objek yang terpilih adalah
       * instanta dari fabric.Circle.
       *
       * Pada tutorial ini, kita mengasumsikan bahwa objek lingkaran
       * adalah benar-benar lingkaran (bukan oval). Nah, objek fabric.Circle
       * memiliki 2 properti yang menyimpan nilai dari radius, yaitu:
       * radiusX
       * radiusY
       *
       * Perbedaan dari kedua properti di atas adalah yang pertama mengukur
       * radius pada sumbu x, sementara yang kedua mengukur radius pada sumbu Y.
       * Mengapa begini? Karena instanta fabric.Circle dapat dibuat menjadi
       * bentuk oval, dimana radiusX belum tentu bernilai sama dengan radiusY.
       * 
       * Bagi yang belum memahami sintaks ini, sebenarnya sintaks dibawah
       * ini sama dengan sintak berikut
       *
       * var radius;
       *
       * if (selected instanceof fabric.Circle) {
       *    radius = selected.getRadiusX();
       * } else {
       *    radius = null;
       * }
       */
      radius.value = (selected instanceof fabric.Circle) ? selected.getRadiusX() : null;
    }
  }
  
  function changeBackgroundImage() {
    // memasang latar berdasarkan alamat yang diberikan
    canvas.setBackgroundImage('latar.jpg').renderAll();
  }
  
  // pasang eventlistener
  addListener(width, 'keydown', update);
  addListener(height, 'keydown', update);
  addListener(radius, 'keydown', update);
  addListener(top, 'keydown', update);
  addListener(left, 'keydown', update);
  addListener(angle, 'keydown', update);
  addListener(opacity, 'keydown', update);
  addListener(backgroundImage, 'click', changeBackgroundImage);
  
  canvas.observe({
    'object:selected': updateControl,
    'object:modified': updateControl,
    'object:moving': updateControl,
    'object:scaling': updateControl,
    'object:rotating': updateControl
  });
})();