const canvas = document.getElementById("graph"),
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

  ctx.lineTo(w / 2 + hatchGap * 2, h / 2);
  ctx.arc(w / 2, h / 2, hatchGap, 0, (-1 / 2) * Math.PI, true);
  ctx.lineTo(w / 2 - hatchGap * 2, h / 2 - hatchGap);
  ctx.lineTo(w / 2 - hatchGap * 2, h / 2);
  ctx.lineTo(w / 2, h / 2);
  ctx.lineTo(w / 2, h / 2 + hatchGap);
  ctx.lineTo(w / 2 + hatchGap * 2, h / 2);
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

  ctx.font = `800 ${fontSize}px SpongeBobFont`;
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

/**
 * Checks if a point is in the shaded area.
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @return {boolean} Returns true if the point is in the shaded area, otherwise false.
 */
function isPointInShadedArea(x, y) {
  const isFirstQuadrant = x >= 0 && y >= 0;
  const isSecondQuadrant = x >= 0 && y <= 0;
  const isFourthQuadrant = x <= 0 && y >= 0;

  const isHitCircle = isFirstQuadrant && (x ** 2 + y ** 2 <= R ** 2 / 4);

  const isHitTriangle = isSecondQuadrant && isPointInTriangle(x, y);

  const isHitRectangle = isFourthQuadrant && x >= -R && y <= (R / 2);

  return isHitCircle || isHitRectangle || isHitTriangle;
}

function isPointInTriangle(x, y) {
  const denom = (-hatchGap) * (-R) + (R) * 0;
  const alpha = ((-hatchGap) * (x - 0) + (R) * (y - (-R / 2))) / denom;

  return alpha >= 0 && alpha <= 1;
}

canvas.addEventListener("click", function (event) {
  const rInputs = document.querySelectorAll("input[name='r']");
  let r = null;
  for (let i = 0; i < rInputs.length; i++) {
    if (rInputs[i].checked) {
      r = parseFloat(rInputs[i].value);
      break;
    }
  }

  if (r === null) {
    alert("Please select a value for r.");
    return;
  }
  const [x, y] = convertArgs(event.clientX, event.clientY);
  console.log("(X,Y):", x, -y);
  const isInShadedArea = isPointInShadedArea(x, -y);
  drawPoint(x, y, (isInShadedArea ? "#FFF56C95" : "#00000080"));
});

/**
 * Converts the given coordinates on the canvas to relative coordinates.
 *
 * @param {number} iX - The x-coordinate on the canvas.
 * @param {number} iY - The y-coordinate on the canvas.
 * @return {Array} An array containing the converted x and y coordinates.
 */
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
  playSplat();
  ctx.beginPath();
  ctx.arc(w / 2 + x, h / 2 + y, 5, 0, 2 * Math.PI);

  ctx.fillStyle = color
  ctx.fill();
  ctx.closePath();
}

function playSplat() {
  const splat = new Audio("./assets/splat.mp3");
  splat.volume = 0.5;
  splat.play();
}