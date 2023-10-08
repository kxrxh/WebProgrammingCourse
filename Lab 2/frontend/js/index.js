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
    const ohYeah = new Audio("./assets/ohyeah.mp3");
    ohYeah.play();
}


function sendDataToServer() {
    const xInputs = document.querySelectorAll("input[name='x']");
    let x = null;
    for (let i = 0; i < xInputs.length; i++) {
        if (xInputs[i].checked) {
            x = parseFloat(xInputs[i].value);
            break;
        }
    }

    const yInput = document.querySelector("input[name='y']");
    const y = parseFloat(yInput.value);

    const rInputs = document.querySelectorAll("input[name='r']");
    let r = null;
    for (let i = 0; i < rInputs.length; i++) {
        if (rInputs[i].checked) {
            r = parseFloat(rInputs[i].value);
            break;
        }
    }

    if (!validate(x, y, r)) {
        return;
    }

    const body = {
        "action": "insert",
        "x": x,
        "y": y,
        "r": r,
        "currentTime": Date.now()
    };

    fetch("/web-lab2-1.0/controller", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            if (data['statusCode'] === 200) {
                const tableBody = document.querySelector(".result-table tbody");
                tableBody.insertAdjacentHTML("beforeend", data["content"]);
                if (data["isHit"]) {
                    playHit();
                } else {
                    playFail();
                }
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

const xValues = new Set([-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]);
const rValues = new Set([1, 1.5, 2, 2.5, 3]);

/**
 * Validates the input values for x, y, and r.
 *
 * @param {number} x - The value of x.
 * @param {number} y - The value of y.
 * @param {number} r - The value of r.
 * @return {boolean} Returns true if the input values are valid, otherwise false.
 */
function validate(x, y, r) {
    return x !== null && y !== null && r !== null &&
        xValues.has(x) && y >= -5 && y <= 3 && rValues.has(r);
}


function clearTable() {
    body = {
        "action": "clean",
    };
    fetch("/web-lab2-1.0/controller", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => {
        response.status === 200 ? document.querySelector(".result-table tbody").innerHTML = "" : console.log(response);
    })
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


const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    sendDataToServer(); // Call your function
});

