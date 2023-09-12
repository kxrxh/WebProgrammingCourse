const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  sendDataToServer(); // Call your function
});

function sendDataToServer() {
  const xInputs = document.getElementsByName("x");
  let x = null;
  for (let i = 0; i < xInputs.length; i++) {
    if (xInputs[i].checked) {
      x = parseFloat(xInputs[i].value);
      break;
    }
  }

  const yInput = document.querySelector("input[name='y']");
  const y = parseFloat(yInput.value);

  const rInputs = document.getElementsByName("r");
  let r = null;
  for (let i = 0; i < rInputs.length; i++) {
    if (rInputs[i].checked) {
      r = parseInt(rInputs[i].value);
      break;
    }
  }
  // Проверка валидности данных
  if (isValidInput(x, y, r)) {
    const xhr = new XMLHttpRequest();
    let params = {
      x: x,
      y: y,
      r: r,
    };
    const target = "php/submit.php" + formatParams(params);
    xhr.open("POST", target);

    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Проверяем, что полученные данные валидны
        if (data.time !== undefined && data.result !== undefined) {
          const newRow = `<tr>
                <td>${x}</td>
                <td>${y}</td>
                <td>${r}</td>
                <td>${data.time}</td>
                <td class='${data.result}'>${data.result}</td>
              </tr>`;
          const tbody = document.querySelector(".result-table tbody");
          tbody.insertAdjacentHTML("beforeend", newRow);
          if (data.result == "hit") {
            playHit();
          } else {
            playFail();
          }
        } else {
          alert("Ошибка при обработке данных.");
        }
      } else {
        alert("Ошибка при отправке данных на сервер.");
      }
    };

    xhr.onerror = function () {
      alert("Ошибка при отправке данных на сервер.");
    };
    xhr.send();
  } else {
    alert("Неверные данные в форме.");
  }
  return true;
}

function isValidInput(x, y, z) {
  return x !== null && y !== null && z !== null;
}

function formatParams(params) {
  return (
    "?" +
    Object.keys(params)
      .map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
}
