import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default ({ data }) => {
  const { height, width } = useWindowDimensions();
  const canvasRef = useRef(null);
  const radius = 200;
  var runOnce = true;
  var alpha = 0, /// current alpha value
    delta = 0.05; /// delta = speed

  function fadein(img, x, y, w, h) {
    alpha += delta;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, x, y, w, h);

    requestAnimationFrame(() => fadein(img, x, y, w, h));
  }

  useEffect(() => {
    if (!data) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width, height); // clear canvas for redrawing
    ctx.lineWidth = 5;

    const dist = (2 * Math.PI) / data.people.length;
    const center = { x: width / 2, y: height / 2 };
    data.people.forEach((person, i) => {
      const angle = i * dist;

      const x = Math.floor(center.x + radius * Math.cos(angle));
      const y = Math.floor(center.y + radius * Math.sin(angle));
      person.setPos(x, y);

      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.stroke();

      const image = new Image();
      image.src = person.getImg();
      const u = getUnitVector(center, { x, y });
      image.onload = () => {
        ctx.drawImage(image, x + u.x * 50, y + u.y * 50, 50, 50);
      };
    });

    data.pairs.forEach((pair) => {
      const person1 = pair[0];
      const person2 = pair[1];
      const count = pair[2];

      const p1Point = person1.getPoint();
      const p2Point = person2.getPoint();

      const p0 = {
        x: p1Point.x,
        y: p1Point.y,
      };
      const midpoint = {
        x: (p1Point.x + p2Point.x) / 2,
        y: (p1Point.y + p2Point.y) / 2,
      };
      const p2 = {
        x: p2Point.x,
        y: p2Point.y,
      };

      const grd = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
      grd.addColorStop(0, person1.getColour());
      grd.addColorStop(1, person2.getColour());

      ctx.strokeStyle = grd;

      if (count === 1) {
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      } else {
        const u = getUnitVector(center, midpoint);

        const curveStrength = Math.random() * 50;
        const side = Math.random() > 0.5 ? 1 : -1;
        const p1 = {
          x: midpoint.x + side * curveStrength * u.x,
          y: midpoint.y + side * curveStrength * u.y,
        };

        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
      }
      ctx.stroke();
    });
  }, [data, data?.people]);

  const getUnitVector = (p0, p1) => {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len;
    const ny = dy / len;
    return { x: nx, y: ny };
  };

  const getPerson = (people, name) => {
    return people.find((person) => person.name === name);
  };
  //   const displayWidth = Math.floor(2 * width);
  //   const displayHeight = Math.floor(2 * height);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
