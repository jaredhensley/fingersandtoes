$(document).ready(function () {

  //dom elements
  let startbtn = $('#start-btn');
  let clearbtn = $('#clear-btn');
  let resetbtn = $('#reset-btn');
  let timerDisplay = $('.timer-display');
  var input = $('#timer-input');

  //globals 
  let countdown;
  let countdownUpperLimit = 10;
  let i = 0;

  //event handlers
  startbtn.on('click', () => {
    if (!input.val()) {
      input.val(10);
    }
    countdownUpperLimit = input.val();
    countdownStart();
  });

  clearbtn.on('click', () => {
    resetGame();
  });

  resetbtn.on('click', () => {
    countdownReset(countdown);
    resetGame();
  });

  input.on('submit', () => {
    countdownUpperLimit = this.val();
  });

  //helper functions
  var countdownStart = () => {
    if (i <= countdownUpperLimit) {
      timerDisplay.html(i);
      i++;

      if (i <= countdownUpperLimit) {
        countdown = setTimeout(countdownStart, 1000);
      } else {
        setTimeout(resetGame, 1000);
      }
    }
  }

  var countdownInit = () => {
    countdownStart();
  }

  var countdownReset = (countdown) => {
    clearTimeout(countdown)
  }

  var resetGame = () => {
    countdownUpperLimit = 0;
    i = 0;
    input.val("");
    timerDisplay.html(i);
  }

});