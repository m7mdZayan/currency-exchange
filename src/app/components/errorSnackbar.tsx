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
    <div className="container mx-auto max-w-[750px] py-4">
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
    </div>
  );
};

export default ErrorSnackbar;
