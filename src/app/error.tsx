"use client";

import { Button, Typography, Container } from "@mui/material";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container
      maxWidth="md"
      className="flex items-center justify-center flex-col text-center h-[100vh]"
    >
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        {error.message ||
          "An unexpected error occurred. Please try again later."}
      </Typography>
      <Button variant="contained" color="primary" onClick={reset}>
        Try Again
      </Button>
    </Container>
  );
}
