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

  ctx.lineTo(w / 2, h / 2);
  ctx.lineTo(w / 2 + hatchGap, h / 2);
  ctx.lineTo(w / 2, h / 2 + hatchGap * 2);
  ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchGap * 2);
  ctx.lineTo(w / 2 - hatchGap, h / 2);
  ctx.arc(w / 2, h / 2, hatchGap, Math.PI, 1.5 * Math.PI, false);
  ctx.lineTo(w / 2, h / 2);
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


canvas.addEventListener('click', async (event) => {
  if (window.rInput) {
    const [x, y] = convertArgs(event.clientX, event.clientY);
    tx = (x / hatchGap) * window.rInput / 2;
    ty = (-y / hatchGap) * window.rInput / 2;
    executeAddPoint([{ name: "x", value: tx }, { name: "y", value: ty }]);
    console.log("(X, Y): (" + (x / hatchGap) * window.rInput / 2 + ", " + (-y / hatchGap) * window.rInput / 2 + ")");
    const resp = await getPointDataExecute([{ name: 'r', value: window.rInput - 0 }])
    const dots = JSON.parse(resp.jqXHR.pfArgs.dots);
    const new_dot = dots[dots.length - 1];
    const [dx, dy] = toGraphCoords(new_dot.x, new_dot.y, new_dot.r);
    drawPoint(dx, dy, new_dot.result ? "blue" : "red");
  }
})

function toGraphCoords(x, y, r) {
  return [x * 2 / r * hatchGap, -y * 2 / r * hatchGap];
}

function drawDots(dots) {
  for (let i = 0; i < dots.length; i++) {
    const [x, y] = toGraphCoords(dots[i].x, dots[i].y, dots[i].r);
    drawPoint(x, y, dots[i].result ? "blue" : "red");
  }
}

function convertArgs(iX, iY) {
  const rect = canvas.getBoundingClientRect();
  const x = iX - rect.left - w / 2;
  const y = iY - rect.top - h / 2;
  return [x, y];
}

/**
 * Draws a point on the canvas.
 *
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 */
function drawPoint(x, y, color) {
  ctx.beginPath();
  ctx.arc(w / 2 + x, h / 2 + y, 5, 0, 2 * Math.PI);

  ctx.fillStyle = color
  ctx.fill();
  ctx.closePath();
}