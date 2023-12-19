import { useEffect, useRef, useState } from "react";
import "../theme/canvas.css";
import { addPoint, fetchPointsWithToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../storage/actions/userActions";
import { GraphData } from "../utils/graph";

var hatchGap = 35;
var hatchWidth = 14 / 2;


function Graph({ rValue, updateTable, forceUpdate }: any) {
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width);
    const h = (canvas.height);

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

    drawAllPoints();

    return () => {
    };
  }, [rValue, forceUpdate]); // 

  const drawPoint = (x: number, y: number, color: string) => {
    if (rValue == "R" || rValue == "") {
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = canvasRef.current!.getContext("2d")!;

    ctx.beginPath();
    ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, hatchGap / 8, 0, 2 * Math.PI);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  const drawAllPoints = async () => {
    if (rValue == "R" || rValue == "") {
      return;
    }

    await fetchPointsWithToken(token, rValue).then((data) => {
      const points: GraphData = data['points'];
      points.forEach((point) => {
        const [dx, dy] = toGraphCoords(point.x, point.y, point.r);
        drawPoint(dx, dy, point.hit ? "#00ff00" : "#ff0000");
      });
    })
  }
  const convertArgs = (iX: number, iY: number): [number, number] => {
    let w = canvasRef.current!.clientWidth;
    let h = canvasRef.current!.clientHeight;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = iX - rect.left - w / 2;
    const y = iY - rect.top - h / 2;
    return [x, y];
  }

  function toGraphCoords(x: number, y: number, r: number): [number, number] {
    return [x * 2 / r * hatchGap, -y * 2 / r * hatchGap];
  }

  const canvasClick = async (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (rValue != "R" && rValue != "") {
      const [x, y] = convertArgs(event.nativeEvent.clientX, event.nativeEvent.clientY);

      const tx = (x / hatchGap) * rValue / 2;
      const ty = (-y / hatchGap) * rValue / 2;
      await addPoint(token, tx, ty, rValue).then((data) => {
        const point = data['points'][0];
        const [dx, dy] = toGraphCoords(point.x, point.y, point.r);
        drawPoint(dx, dy, point.hit ? "#2dd36f" : "#3dc2ff");
        updateTable();
      }).catch((error) => {
        if (error.message == "Unauthorized!") {
          dispatch(logoutAction());
          return;
        }
      });
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "10px" }}>
      <canvas className="canvas"
        ref={canvasRef}
        width={"230vh"}
        height={"230vh"}
        style={{ maxWidth: "calc(min(60vw, 270px))" }} onClick={canvasClick} />
    </div>
  );
}

export default Graph;