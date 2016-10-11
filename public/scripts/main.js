$(document).ready(function () {

  /*cached dom elements*/
  let startbtn = $('#start-btn');
  let clearbtn = $('#clear-btn');
  let resetbtn = $('#reset-btn');
  let timerDisplay = $('.timer-display');
  let form = $('form');
  let input = $('#timer-input');
  let fingersBox = $('.fingers-box');
  let toesBox = $('.toes-box');


  /*globals*/
  let countdown;
  let countdownUpperLimit = 10;
  let i = 0;

  /*event handlers*/
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

  form.on('submit', (e) => {
    e.preventDefault();
    countdownUpperLimit = input.val();
    countdownInit();
  });

  /*helper functions*/
  var countdownStart = () => {
    if (i <= countdownUpperLimit) {
      timerDisplay.html(i + 's');
      fizzBuzzCheck(i);
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
    fingersBox.css('color', 'white');
    toesBox.css('color', 'white');
  }

  var fizzBuzzCheck = () => {
    if (i > 0) {
      if (i % 5 === 0 && i % 3 === 0) {
        fingersBox.css('color', 'red');
        toesBox.css('color', 'red');
      } else if (i % 5 === 0) {
        fingersBox.css('color', 'red');
      } else if (i % 3 === 0) {
        toesBox.css('color', 'red');
      } else {
        fingersBox.css('color', 'white');
        toesBox.css('color', 'white');
      }
    }
  }

});