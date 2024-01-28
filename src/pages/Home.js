import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

function Home() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  // Subset of props, to illustrate the idea.
  const config = isMatch ? { fontSize: 26 } : { fontSize: 30 };

  // Here only root <Box/> is configured, but you can configure all the nested components the same way.
  return (
    <div className="mainPage">
      <Box sx={config}>[...] teqipwehboiqbenoqw</Box>
    </div>
  );
}

export default Home;
