function Slate ()
{
  this.pressed = false,
  this.preX, this.preY ,this.canvas = 'slate',this.shapes = [],
  this.init = function(){
    var _self = this;
    this.ctxEle = document.getElementById(this.canvas) 
    this. ctx = this.ctxEle.getContext("2d");
    $('#'+this.canvas).mousedown(function (event) {
        _self.pressed = true;
        _self.draw(event.pageX - $(this).offset().left, event.pageY - $(this).offset().top, false);        
    }); 

    $('#'+this.canvas).mousemove(function (event) {
        if (_self.pressed) {
            _self.draw(event.pageX - $(this).offset().left, event.pageY - $(this).offset().top, true);
        }
    });

    $('#'+this.canvas).mouseup(function (e) {
        _self.pressed = false;
    });
      $('#'+this.canvas).mouseleave(function (e) {
        _self.pressed = false;
    });

  },
  this.draw = function(x, y, pressed) {
    if (pressed) {
        with(this.ctx)
        {
			beginPath();
			strokeStyle = ($("#colorPicker").spectrum("get")).toHexString();
			lineWidth = $('#selWidth').val();
			lineJoin = "round";
			moveTo(this.preX, this.preY);			
			lineTo(x, y);
			closePath();
			stroke();
      }
    }
    this.preX = x; this.preY = y;
},
this.clean = function(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
},

this.save = function (canvas, callback) {
  // create a dummy canvas to setup the bg

  var fakeC = document.createElement("canvas");
  fakeC.width = canvas.width;
  fakeC.height = canvas.height;
  fakeCtx = fakeC.getContext('2d');
  fakeCtx.fillStyle = "#000";
  fakeCtx.fillRect(0,0,canvas.width,canvas.height);
  fakeCtx.drawImage(canvas, 0, 0);

  var image = new Image();
  image.onload = function(){
    fakeC.remove();
    callback(image);
  };
  image.src = fakeC.toDataURL("image/png");    
}


  this.init();
  return this;
} 


if($("canvas").length > 0)
{
var slate = new Slate();
$("#clear").on("click", function(){slate.clean(slate.ctx)});
$("#save").on("click", function(){
  slate.save(slate.ctxEle, function(img){
     $("#img").html(img);
     $('#savedImage').modal('show')
  });  
});


$(document).ready(function () {
  $('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });


  // color picker
  $("#colorPicker").spectrum({
    color: "#fff",
    showPalette: true,
    showAlpha: true,
    localStorageKey: "slate.io.color.picker",
    palette: [
         ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]
});


});


}






function resize() {
    var canHolder = document.getElementById("canHolder");
    var canvas = document.getElementById('slate');
    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = canHolder.offsetHeight / canHolder.offsetWidth;
    var width;
    var height;

    if (windowRatio < canvasRatio) {
        height = canHolder.offsetHeight;
        width = height / canvasRatio;
    } else {
        width = canHolder.offsetWidth;
        height = width * canvasRatio;
    }

    //console.log(width, height);

    canvas.style.width = (width -27)+ 'px';
    canvas.style.height = height + 'px';

};

window.addEventListener('resize', resize, false);
resize();

$(function(){
  $("#theme").on("change", function(){
     var theme = $("#theme").val();
     $("body,.modal-body").removeClass("bg-black").removeClass("bg-blue").removeClass("bg-green").addClass("bg-"+theme);


  });  
  $("body").addClass("bg-black");

});
