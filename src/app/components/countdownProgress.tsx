import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface ICountdownProgress {
  timeLeft: number;
}

const CountdownProgress: React.FC<ICountdownProgress> = ({ timeLeft }) => {
  return (
    <div className="flex items-center gap-2 justify-start pt-2 pb-4">
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Data will be updated in
      </Typography>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={(timeLeft / 60) * 100} />
        <Box className="absolute flex items-center justify-center inset-0">
          <Typography variant="body2" color="textSecondary">
            {timeLeft}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        seconds
      </Typography>
    </div>
  );
};

export default CountdownProgress;
