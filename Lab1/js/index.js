const theme = new Audio("./assets/intro.mp3");

function playTheme() {
  if (!theme.paused && theme.duration > 0) {
    theme.pause();
    theme.currentTime = 0;
    return;
  }
  theme.play();
}
function playFail() {
  const fail = new Audio("./assets/fail.mp3");
  fail.play();
}

function playSad() {
  const sad = new Audio("./assets/sad.mp3");
  sad.currentTime = 0.3;
  sad.play();
}

function playHit() {
  const ohyeah = new Audio("./assets/ohyeah.mp3");
  ohyeah.play();
}
