$(document).ready(function () {

  /*cached dom elements*/
  let startbtn = $('#start-btn');
  let restartbtn = $('#restart-btn');
  let resetbtn = $('#reset-btn');
  let timerDisplay = $('#timer-display');
  let form = $('form');
  let input = $('#timer-input');
  let fingersBox = $('#fingers-box');
  let toesBox = $('#toes-box');


  /*globals*/
  let countdown;
  let countdownUpperLimit = 0;
  let currentSecond = 0;
  
  /*helper functions*/
  let countdownStart = () => {
    if (currentSecond <= countdownUpperLimit) {
      timerDisplay.html(currentSecond + 's');
      fizzBuzzCheck(currentSecond);
      currentSecond++;

      if (currentSecond <= countdownUpperLimit) {
        countdown = setTimeout(countdownStart, 1000);
      } else {
        setTimeout(resetGame, 1000);
      }
    }
  }

  let countdownReset = (countdown) => {
    clearTimeout(countdown)
  }

  let resetGame = () => {
    countdownUpperLimit = 0 ;
    currentSecond = 0;
    input.val("");
    timerDisplay.html(currentSecond + "s");
    fingersBox.css('color', 'white');
    toesBox.css('color', 'white');
  }

  let fizzBuzzCheck = () => {
    fingersBox.css('color', 'white');
    toesBox.css('color', 'white');
    if (currentSecond > 0) {
      if (currentSecond % 5 === 0 && currentSecond % 3 === 0) {
        fingersBox.css('color', 'red');
        toesBox.css('color', 'red');
      } else if (currentSecond % 5 === 0) {
        fingersBox.css('color', 'red');
      } else if (currentSecond % 3 === 0) {
        toesBox.css('color', 'red');
      } else {
        console.log(currentSecond);
      }
    }
  }
  
  /*event handlers*/
  startbtn.on('click', () => {
    currentSecond = 0;
    countdownUpperLimit = input.val(); 
    countdownReset(countdown);  
    countdownStart();
  });

  resetbtn.on('click', () => {
    countdownReset(countdown);
    resetGame();
  });

  restartbtn.on('click', () => {
    countdownReset(countdown);
    timerDisplay.html("0s");
    currentSecond = 0;
    countdownStart();
  });

  form.on('submit', (e) => {
      currentSecond = 0;
    countdownReset(countdown);
    e.preventDefault();
    countdownUpperLimit = input.val();
    countdownStart();
  });

  
});