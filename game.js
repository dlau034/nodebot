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
    , timeout = 3000
    , count = 0
    , score = 0
    , level = 1
    , timer = null
    , expected = null
  ;

  var play = function() {

    greenLight.off();
    redLight.off();

    var randomIndex = Math.floor(Math.random() * ACTIONS.length);
    expected = ACTIONS[randomIndex];

    console.log('%s\n', expected.toUpperCase());

    slide.on('change', handleInput);
    touch.on('up', handleInput);
    tilt.on('change', handleInput);
    timer = setTimeout(handleTimeout, timeout);
  }

  var handleTimeout = function() {
    clearTimeout(timer);
    console.log('Times up!');
    end();
  }

  var end = function() {
    console.log('Game over!');
    process.exit();
  }

  var handleInput = function() {
    clearTimeout(timer);


    if (this === tilt ) {
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
      count += 1;
      score += 1;
      console.log('Level: %s, CURRENT SCORE: %s\n', level, score);
      if (count === 5) {
        timeout *= .9;
        level += 1;
        count = 0;
        console.log('\nYou have advanced to the next level, timeout is now %s.\nGet ready ...\n', timeout);
        setTimeout(play, 1000);
      } else {
        setTimeout(play, 1000);  
      }
    } else {
      greenLight.off();
      redLight.on();  
      console.log('WHOOPS. You hit: ', action);
      end();
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