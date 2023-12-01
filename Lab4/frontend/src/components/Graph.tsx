import { useEffect, useRef } from "react";
import "../theme/canvas.css";

function Graph({ rValue }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.width;
    let h = canvas.height;
    const hatchWidth = 14 / 2;
    const hatchGap = 35;

    function redrawGraph(r: any) {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffc409";

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

      ctx.fillStyle = "#ed576b80";
      ctx.beginPath();

      ctx.lineTo(w / 2, h / 2);
      ctx.lineTo(w / 2 + hatchGap, h / 2);
      ctx.lineTo(w / 2, h / 2 + hatchGap * 2);
      ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchGap * 2);
      ctx.lineTo(w / 2 - hatchGap, h / 2);
      ctx.arc(w / 2, h / 2, hatchGap, Math.PI, 1.5 * Math.PI, false);
      ctx.lineTo(w / 2, h / 2);
      ctx.fill();

      ctx.strokeStyle = "#eb445a";
      ctx.stroke();
      ctx.closePath();

      const fontSize = hatchGap / 3.5;
      ctx.fillStyle = "#ffc409";

      ctx.font = `500 ${fontSize * 1.5}px Noto Sans`;
      ctx.fillText("y", w / 2 - hatchWidth * 2.8, 15);
      ctx.fillText("x", w - 20, h / 2 - hatchWidth * 2.4);

      let label1: any, label2: any;
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

    redrawGraph(rValue);

    return () => {
      // You can perform cleanup here if necessary
      // For example, remove event listeners or clear intervals
    };
  }, [rValue]); // 
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "10px" }}>
      <canvas className="canvas"
      ref={canvasRef}
       width={"230vh"}
       height={"230vh"}
       style={{ maxWidth: "calc(min(60vw, 270px))" }} />
    </div>
  );
}

export default Graph;