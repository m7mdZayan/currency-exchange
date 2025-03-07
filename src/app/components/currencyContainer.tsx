"use client";

import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import CurrencyConverter from "./currencyConverter";
import CurrencyTable from "./currencyTable";
import CountdownProgress from "./countdownProgress";
import { ExchangeRates } from "../utils/types";
import { POLLING_INTERVAL } from "../utils/data";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

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
      <CountdownProgress timeLeft={timeLeft} />
      <CurrencyConverter rates={rates} />
      <Divider sx={{ my: 2 }} />
      <CurrencyTable rates={rates} />
    </div>
  );
};

export default CurrencyContainer;
