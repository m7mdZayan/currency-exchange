"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Divider, SnackbarCloseReason } from "@mui/material";
import CurrencyConverter from "./currencyConverter";
import CurrencyTable from "./CurrencyTable";
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

  const fetchRates = useCallback(async () => {
    const updatedRates = await fetchExchangeRates();
    if (updatedRates) {
      setRates(updatedRates);
      setShowSnackbar(false);
    } else {
      setShowSnackbar(true);
    }
    setTimeLeft(POLLING_INTERVAL / 1000);
  }, []);

  useEffect(() => {
    fetchRates();
    const updateDataInterval = setInterval(fetchRates, POLLING_INTERVAL); // fetch data every POLLING_INTERVAL (now60 seconds )
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : POLLING_INTERVAL / 1000));
    }, 1000); // update countdown every second to inform the user when the data will be updated

    return () => {
      clearInterval(updateDataInterval);
      clearInterval(countdown);
    };
  }, [fetchRates]);

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
