var five = require("johnny-five")
  , board = new five.Board()
;


board.on("ready", function() {

  var slide = new five.Sensor("I0")
    , tilt = new five.Sensor('I1')
    , light = new five.Sensor('I2')
    , touch = new five.Button('O1')
    , bigLight = new five.Led("O0")
    , greenLight = new five.Led('O2')
    , redLight = new five.Led('O3')
    // , yellowLight = new five.Led('04')
  ;

  bigLight.state = true;

  greenLight.off();
  redLight.off();

  tilt.on('change', function() {
    if (this.boolean === true) {
      greenLight.on();
      redLight.off();  
    } else {
      greenLight.off();
      redLight.on();  
    }
  });

  slide.scale(0, 255).on('read', function() {   		   
    var val = Math.round(this.value);
    if (bigLight.state === true) bigLight.brightness(val);
  });

  touch.on('up', function() {
    (bigLight.state === true) ? bigLight.off() : bigLight.on(); 
    bigLight.state = !bigLight.state;
  });

  light.scale(0, 100).on('read', function() {
    (this.normalized < 75) ? greenLight.on() : greenLight.off();
  });

});