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

function load() {
  const discord = new Audio("./assets/discord-sounds.mp3");
  discord.play();
}
document.addEventListener('keypress', (e) => {
  var name = e.key;
  if (name == "f") {
    if (document.getElementById("appbar").style.fontFamily == "serif") {
      document.getElementById("appbar").style.fontFamily = "SpongeBobFont";
    } else
      document.getElementById("appbar").style.fontFamily = "serif";
  }
}, false)
