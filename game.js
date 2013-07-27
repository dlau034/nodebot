var five = require("johnny-five")
  , board = new five.Board()
;


board.on("ready", function() {

  var slide = new five.Sensor("I0")
    , tilt = new five.Sensor('I1')
    , currentTilt = tilt.value
    , touch = new five.Button('O1')
    , greenLight = new five.Led('O2')
    , redLight = new five.Led('O3')
    , ACTIONS = ['touch', 'slide', 'tilt' ]
    , expected = null
    , timeout = null
  ;

  var play = function() {

    greenLight.off();
    redLight.off();

    var randomIndex = Math.floor(Math.random() * ACTIONS.length);
    expected = ACTIONS[randomIndex];

    console.log('Engage with: %s', expected);

    slide.on('change', handleInput);
    touch.on('up', handleInput);
    tilt.on('change', handleInput);

    timeout = setTimeout(end, 5000);
  }

  var handleTimeout = function() {
    clearTimeout(timeout);
    console.log('Times up!');
    end();
  }

  var end = function() {
    console.log('Game over!');
    process.exit();
  }

  var handleInput = function() {
    clearTimeout(timeout);


    if (this === tilt) {
      if (currentTilt === null || this.value > 900) {
        currentTilt = this.value;
        return;
      }
    }

    slide.removeListener('change', handleInput);
    touch.removeListener('up', handleInput);
    tilt.removeListener('change', handleInput);

    if (this === slide)
      action = 'slide'
    else if (this === touch)
      action = 'touch'
    else
      action = 'tilt'

    var success = expected === action;
    
    if (success) {
      greenLight.on();
      redLight.off();
      setTimeout(play, 500);
    } else {
      greenLight.off();
      redLight.on();  
      setTimeout(end, 500);
    }

  };

  var init = function() {
    console.log('Get ready to play the GAME:\n\n');
    play();
  };
  

  slide.once('change', function() {
    // `slide` emits a 'change' when the application starts
    // use that event to init.
    init();
  });

});