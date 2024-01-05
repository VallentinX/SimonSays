/* Step One: Done ✅ */
/* Step Two: Done ✅ */
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
/* Step Seven: Done ✅ */
let level = 0;
let started = false;
document.addEventListener("keydown", function () {
  if (!started) {
    document.getElementById("level-title").textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    /* Step Four: Done ✅ */
    playSound(userChosenColour);
    /* Step Six 2/2: Done ✅ */
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  const selectedDiv = document.getElementById(randomChosenColour);
  /* Step Three: Done ✅ */
  selectedDiv.style.opacity = "0";
  setTimeout(function () {
    selectedDiv.style.opacity = "1";
  }, 100);
  playSound(randomChosenColour);
}
/* Step Five: Done ✅ */
const playSound = (sound) => {
  new Audio(`./sounds/${sound}.mp3`).play();
};
/* Step Six 1/2: Done ✅ */
function animatePress(currentColour) {
  const selectedDiv = document.getElementById(currentColour);
  selectedDiv.classList.add("pressed");
  setTimeout(function () {
    selectedDiv.classList.remove("pressed");
  }, 100);
}
/* Step Eight: Done ✅ */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);
    document.getElementById("level-title").textContent =
      "Game Over! Press any key to start again!";
    startOver();
  }
}
/* Step Nine: Done ✅ */
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
