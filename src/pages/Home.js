import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Canvas from "../components/Canvas";

function Home() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#000";
    // ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1000000, 1000000);
    // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  };

  return <Canvas draw={draw} />;
}

export default Home;
