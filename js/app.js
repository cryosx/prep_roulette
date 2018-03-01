/*From wikipedia https://en.wikipedia.org/wiki/Roulette
Roulette is a casino game named after the French word meaning little wheel. In the game, players may choose to place bets on either a single number, various groupings of numbers, the colors red or black, whether the number is odd or even, or if the numbers are high (19–36) or low (1–18).*/

//Objective
/*Create a web app that will generate a random number between 0 - 36.
For even numbers not including zero, give it a background color of black and a font color of white.
For odd numbers, give it a background color of red and a font color of white.
For the number 0, give it a background color of green and a font color of white.

A random number will be generated every 5 seconds.*/

// Bonus
// 1) Add some additional styling to your application.
// 2) Create on and off buttons that will start and stop your application.

var number = 0;
var results = [];

function randomNumber(max) {
	return Math.floor(Math.random() * max);
}

function roulette() {
	number = randomNumber(37);
	randomNum.innerHTML = number;
	if (number % 2 === 1) {
		randomNum.style = "color: white; background-color: red";
	} else {
		randomNum.style = "color: white; background-color: black";
	} 

	if (number === 0) {
	randomNum.style = "color: white; background-color: green";
	}
}

var interval = null;


toggleButton.addEventListener("click", function() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		} else {
      spin();
			interval = setInterval(function() {
        spin();
        console.log(results);
      }, 6000);
		}
});

// https://codepen.io/barney-parker/pen/OPyYqy

// var options = ["$100", "$10", "$25", "$250", "$30", "$1000", "$1", "$200", "$45", "$500", "$5", "$20", "Lose", "$1000000", "Lose", "$350", "$5", "$99"];

var options = [0, 32, 15, 19, 4, 21, 2, 25, 17, 24, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
// var options = [];
// for (var i = 0; i < 37; i++) {
// 	options.push(i);
// }

// var startAngle = 0;
var startAngle = 4.63;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", function() {
  spin();
  console.log(results);

});

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

// function getColor(item, maxitem) {
//   var phase = 0;
//   var center = 128;
//   var width = 127;
//   var frequency = Math.PI*2/maxitem;
  
//   red   = Math.sin(frequency*item+2+phase) * width + center;
//   green = Math.sin(frequency*item+0+phase) * width + center;
//   blue  = Math.sin(frequency*item+4+phase) * width + center;
  
//   return RGB2Color(red,green,blue);
// }

function getColor(item) {
  var fillColor = "";
  // console.log(item);
  if (item === 0) {
  	fillColor = "green";
  } else if (item % 2 === 0) {
  	fillColor = "black";
  } else {
  	fillColor = "red";
  }
  return fillColor;
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 180;
    var insideRadius = 170;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 14px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      // console.log(angle);
      // console.log(options[i]);
      // ctx.fillStyle = colors[i];
      // ctx.fillStyle = getColor(i, options.length);
      ctx.fillStyle = getColor(i);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      // ctx.shadowOffsetX = -1;
      // ctx.shadowOffsetY = -1;
      // ctx.shadowBlur    = 0;
      // ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 


    //Arrow
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();


  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;

  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);


  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();

  ctx.beginPath();
  ctx.arc(250, 250, 165, 0, 2*Math.PI, false);
  ctx.fillStyle = getColor(options[index]);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 100px Helvetica, Arial';
  var text = options[index];
  results.push(options[index]);
  ctx.fillStyle = 'white';
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 25);

  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();


