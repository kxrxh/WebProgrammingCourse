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

function playHit() {
  const ohyeah = new Audio("./assets/ohyeah.mp3");
  ohyeah.play();
}

document.addEventListener(
  "keypress",
  (e) => {
    var name = e.key;
    if (name == "f") {
      if (document.getElementById("appbar").style.fontFamily == "serif") {
        document.getElementById("appbar").style.fontFamily = "SpongeBobFont";
        return;
      }
      document.getElementById("appbar").style.fontFamily = "serif";
    }
  },
  false
);

function loadTableData() {
  fetch("./php/init.php")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const tbody = document.querySelector(".result-table tbody");
      tbody.innerHTML = data;
    })
    .catch((error) => console.error("Error loading table data:", error));
}

// Call the function when the page loads
window.addEventListener("load", loadTableData);

function clearTable() {
  const tbody = document.querySelector(".result-table tbody");
  tbody.innerHTML = ""; // Clear the table content

  // Add an additional AJAX request to clear the cookies
  fetch("./php/clear.php")
    .then((response) => {
      // Check if the cookies were successfully cleared
      if (document.cookie.indexOf("table_data=") === -1) {
        console.log("Cookies cleared successfully.");
      } else {
        console.error("Failed to clear cookies.");
      }
    })
    .catch((error) => console.error("Error clearing cookies:", error));
}
