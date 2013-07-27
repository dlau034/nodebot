var five = require("johnny-five")
  , board = new five.Board()
;


board.on("ready", function() {

  var sensor = new five.Sensor("I0")
    , blink = new five.Led("O0")
    , touch = new five.Button('O1')
  ;

  blink.state = true;

  sensor.scale(0, 255).on("read", function() {   		   
    var val = Math.round(this.value);
    if (blink.state === true) blink.brightness(val);
  });

  touch.on('up', function() {
    (blink.state === true) ? blink.off() : blink.on(); 
    blink.state = !blink.state;
  });

});