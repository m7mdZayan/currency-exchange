"use client";

import React, { useState, useEffect } from "react";
import { Divider, SnackbarCloseReason } from "@mui/material";
import CurrencyConverter from "./currencyConverter";
import CurrencyTable from "./currencyTable";
import CountdownProgress from "./countdownProgress";
import { ExchangeRates } from "../utils/types";
import { POLLING_INTERVAL } from "../utils/data";
import { fetchExchangeRates } from "../utils/api";
import ErrorSnackbar from "./errorSnackbar";

interface ICurrencyContainerProps {
  initialRates: ExchangeRates;
}

const CurrencyContainer: React.FC<ICurrencyContainerProps> = ({
  initialRates,
}) => {
  const [rates, setRates] = useState<ExchangeRates>(initialRates);
  const [timeLeft, setTimeLeft] = useState(POLLING_INTERVAL / 1000);
  const [error, setError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  useEffect(() => {
    const fetchRates = async () => {
      const updatedRates = await fetchExchangeRates();
      if (updatedRates) {
        setRates(updatedRates);
        setError(null); // Clear any previous errors
      } else {
        setError("Failed to update exchange rates.");
      }
      setTimeLeft(POLLING_INTERVAL / 1000);
    };

    fetchRates();
    const interval = setInterval(fetchRates, POLLING_INTERVAL);
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (error) {
      setShowSnackbar(true);
      setError(null);
    }
  }, [error]);

  return (
    <div className="container mx-auto max-w-[750px] py-4">
      <ErrorSnackbar
        handleCloseSnackbar={handleCloseSnackbar}
        showSnackbar={showSnackbar}
      />
      <CountdownProgress timeLeft={timeLeft} />
      <CurrencyConverter rates={rates} />
      <Divider sx={{ my: 2 }} />
      <CurrencyTable rates={rates} />
    </div>
  );
};

export default CurrencyContainer;
