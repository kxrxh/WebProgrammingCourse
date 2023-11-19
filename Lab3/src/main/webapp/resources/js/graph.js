const canvas = document.getElementById("myCanvas"),
  ctx = canvas.getContext("2d");

canvas.height = canvas.width;
let w = canvas.width,
  h = canvas.height;

const hatchWidth = 25 / 2;
const hatchGap = 56;

let rValue = "R";
function redrawGraph(r) {
  ctx.clearRect(0, 0, w, h);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";

  // y axis
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2 - 10, 15);
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2 + 10, 15);
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  ctx.closePath();

  // x axis
  ctx.beginPath();
  ctx.moveTo(w, h / 2);
  ctx.lineTo(w - 15, h / 2 - 10);
  ctx.moveTo(w, h / 2);
  ctx.lineTo(w - 15, h / 2 + 10);
  ctx.moveTo(w, h / 2);
  ctx.lineTo(0, h / 2);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
  ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
  ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
  ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
  ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
  ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
  ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
  ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
  ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
  ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
  ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
  ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
  ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
  ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
  ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
  ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = "#26b9c880";
  ctx.beginPath();

  ctx.lineTo(w/2, h/2);
  ctx.lineTo(w/2 + hatchGap, h/2);
  ctx.lineTo(w / 2, h / 2 + hatchGap * 2);
  ctx.lineTo(w/2 - hatchGap, h/2 + hatchGap * 2);
  ctx.lineTo(w/2 - hatchGap, h/2);
  ctx.arc(w/2, h/2, hatchGap, Math.PI, 1.5 * Math.PI, false);
  ctx.lineTo(w/2, h/2);
  ctx.fill();

  ctx.strokeStyle = "#0457A0";
  ctx.stroke();
  ctx.closePath();

  const fontSize = hatchGap / 3.5;
  ctx.fillStyle = "black";

  ctx.font = `500 ${fontSize * 1.4}px SpongeBobFont`;
  ctx.fillText("y", w / 2 - hatchWidth * 2.8, 15);
  ctx.fillText("x", w - 20, h / 2 - hatchWidth * 2.4);

  let label1, label2;
  if (isNaN(r)) {
    label1 = r + "/2";
    label2 = r;
  } else {
    label1 = r / 2;
    label2 = r;
  }
  rValue = label2;

  ctx.font = `800 ${fontSize}px `;
  ctx.fillText(label1, w / 2 + hatchGap - 3, h / 2 + hatchWidth * 2.8);
  ctx.fillText(label2, w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 2.8);
  ctx.fillText("-" + label1, w / 2 - hatchGap - 7, h / 2 + hatchWidth * 2.8);
  ctx.fillText(
    "-" + label2,
    w / 2 - hatchGap * 2 - 7,
    h / 2 + hatchWidth * 2.8
  );

  ctx.fillText(label1, w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
  ctx.fillText(label2, w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
  ctx.fillText("-" + label1, w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
  ctx.fillText("-" + label2, w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);
}

// draw graph with standard label
redrawGraph(rValue);

const R = hatchGap * 2;

canvas.addEventListener('click', (event) => {
  if (rValid) {
      // process click on graph
      const canvasLeft = canvas.offsetLeft + canvas.clientLeft,
          canvasTop = canvas.offsetTop + canvas.clientTop;

      const x = event.pageX - canvasLeft,
          y = event.pageY - canvasTop;

      const xCenter = Math.round((x - w/2) / (hatchGap * (2/rInput.value))*1000)/1000,
          yCenter = Math.round((h/2 - y) / (hatchGap * (2/rInput.value))*1000)/1000;

      const oldX = xInput.value, oldY = yInput.value;
      yInput.value = yCenter;
      xInput.value = xCenter;

      submitBtn.onclick(undefined);

      xInput.value = oldX;
      yInput.value = oldY;
  } else {
      messages.innerText = "Ошибка: значение R не задано!";
  }
})