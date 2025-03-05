"use client";

import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import CurrencyConverter from "./currencyConverter";
import CurrencyTable from "./CurrencyTable";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const POLLING_INTERVAL = 60000; // 60 seconds

type ExchangeRates = {
  [key: string]: number;
};

interface CurrencyContainerProps {
  initialRates: ExchangeRates;
}

const CurrencyContainer: React.FC<CurrencyContainerProps> = ({
  initialRates,
}) => {
  const [rates, setRates] = useState<ExchangeRates>(initialRates);
  const [timeLeft, setTimeLeft] = useState(POLLING_INTERVAL / 1000);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
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

  return (
    <div className="container mx-auto max-w-[750px]">
      <Typography variant="h4" gutterBottom>
        Currency Exchange App
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Next update in {timeLeft} seconds
      </Typography>
      <CurrencyConverter rates={rates} />
      <Divider sx={{ my: 2 }} />
      <CurrencyTable rates={rates} />
    </div>
  );
};

export default CurrencyContainer;
