"use client";

import React from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

interface IErrorSnackbarProps {
  showSnackbar: boolean;
  handleCloseSnackbar: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

const ErrorSnackbar: React.FC<IErrorSnackbarProps> = ({
  showSnackbar,
  handleCloseSnackbar,
}) => {
  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        There was an error in updating data !
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
