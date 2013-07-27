var five = require("johnny-five")
  , boarder = new five.Board()
  , sensor = new five.Sensor("I0")
  , blink = new five.Led("O0")
;


board.on("ready", function() {

  sensor.scale(0, 255).on("read", function() {   		   
      var val = Math.round(this.value);
      blink.brightness(val);
  });
  
});