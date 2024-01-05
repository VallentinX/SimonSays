/* Step One: Done ✅ */
/* Step Two: ✅ */
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
/* Step Seven: 50% ✅ - 50% ❌ */
let level = 0;
let started = false;
jQuery(document).keydown(() => {
  if (!started) {
    jQuery("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

jQuery(".btn").click(function () {
  const userChosenColour = jQuery(this).attr("id");
  userClickedPattern.push(userChosenColour);
  /* Step Four: ❌ */
  playSound(userChosenColour);
  /* Step Six 2/2: 50% ✅ */
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  jQuery("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  /* Step Three: 50% ✅ - 50% ❌*/
  jQuery(`div#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
/* Step Five: ✅ */
const playSound = (sound) => {
  new Audio(`./sounds/${sound}.mp3`).play();
};
/* Step Six 1/2: 50% ✅ - 50% ❌ */
function animatePress(currentColour) {
  jQuery(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    jQuery(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
/* Step Eight: 50% ✅ - 50% ❌ */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    jQuery("body").addClass("game-over");
    setTimeout(function () {
      jQuery("body").removeClass("game-over");
    }, 200);
    jQuery("#level-title").text("Game Over! Press any key to start again!");
    startOver();
  }
}
/* Step Nine: ✅ */
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
