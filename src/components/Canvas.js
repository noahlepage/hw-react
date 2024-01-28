import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default ({ data }) => {
  const [people, setPeople] = useState([]);
  const { height, width } = useWindowDimensions();
  const canvasRef = useRef(null);

  //   useEffect(() => {
  //     const ctx = canvasRef.current.getContext("2d");
  //     const p0 = { x: width / 4, y: height / 2 };
  //     const p1 = { x: width / 2, y: height / 4 };
  //     const p2 = { x: (width * 3) / 4, y: height / 2 };

  //     const grd = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
  //     grd.addColorStop(0, "red");
  //     grd.addColorStop(1, "blue");

  //     ctx.strokeStyle = grd;
  //     ctx.beginPath();
  //     ctx.moveTo(p0.x, p0.y);
  //     ctx.bezierCurveTo(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
  //     ctx.moveTo(p0.x, p0.y);
  //     ctx.lineTo(p2.x, p2.y);

  //     // ctx.fillRect(10, 10, 150, 80);

  //     // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  //     ctx.stroke();
  //   }, [width, height]);

  useEffect(() => {
    if (!data) return;
    const ctx = canvasRef.current.getContext("2d");
    // ctx.clearRect(0, 0, width, height); // clear canvas for redrawing

    const dist = (2 * Math.PI) / data.people.length;
    const center = { x: width / 2, y: height / 2 };
    for (let i = 0; i < data.people.length; i++) {
      const person = data.people[i];
      const angle = i * dist;

      const x = Math.floor(center.x + 100 * Math.cos(angle));
      const y = Math.floor(center.y + 100 * Math.sin(angle));
      person.setPos(x, y);

      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.stroke();

      const dx = x - center.x;
      const dy = y - center.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / len;
      const ny = dy / len;
      ctx.textAlign = "center";
      ctx.fillText(person.name, x + 50 * nx, y + 40 * ny);
      if (person.getImg() === null) continue;

      const image = new Image();
      image.src = person.getImg();
      console.log(image.src);
      //   image.onload = () => {
      ctx.drawImage(image, 10, 10, 150, 180);
      //   };
    }

    for (let i = 0; i < data.people.length; i++) {
      const person = data.people[i];
      const personPoint = person.getPoint();
      const toObj = person.getTo();
      Object.entries(toObj).forEach((entry) => {
        console.log(entry);
        const [toPersonName, count] = entry;
        const toPerson = getPerson(data.people, toPersonName);
        if (!toPerson) return;

        const toPersonPoint = toPerson.getPoint();
        for (let j = 0; j < count; j++) {
          const interval = count != 1 ? 5 * (Math.random() - Math.random()) : 1;
          const p0 = {
            x: personPoint.x + interval,
            y: personPoint.y + interval,
          };
          const p2 = {
            x: toPersonPoint.x + interval,
            y: toPersonPoint.y + interval,
          };

          //   ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    }

    setPeople(data.people);
  }, [data, data?.people]);

  const getPerson = (people, name) => {
    return people.find((person) => person.name === name);
  };

  //   const displayWidth = Math.floor(2 * width);
  //   const displayHeight = Math.floor(2 * height);
  //   const style = { width: dimensions.width, height: dimensions.height };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        // style={style}
      />
    </div>
  );
};
