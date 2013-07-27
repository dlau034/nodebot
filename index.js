// var five = require("johnny-five"),
// 	board = new five.Board();

// board.on("ready", function(){

// 	var LedR = new five.Led(9)
// 	var LedG = new five.Led(10)
// 	var LedB = new five.Led(11)
	
// 	var leds = new five.Leds();

// 	this.repl.inject({
// 		leds: leds
// 	})

// });	




var five = require("johnny-five");

new five.Board().on("ready", function() {

var sensor = new five.Sensor("I0")

console.log(sensor);

var blink = new five.Led("O0");

  sensor.scale(0, 255).on("read", function() {
	   		   
      var val = Math.round(this.value)
      console.log(val);

      blink.brightness(val);
      
  });
});


// var five = require("johnny-five");

// new five.Board().on("ready", function() {
//   new five.Led("O0").strobe(250);
// });

