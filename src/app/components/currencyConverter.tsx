"use client";

import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

type ExchangeRates = {
  [key: string]: number;
};

interface ICurrencyConverter {
  rates: ExchangeRates;
}

const CurrencyConverter: React.FC<ICurrencyConverter> = ({ rates }) => {
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  return (
    <>
      <Typography variant="h4" sx={{ margin: "1rem 0 2rem" }}>
        Currency Converter
      </Typography>
      <div className="flex flex-col md:flex-row gap-6 md:gap-28 items-center">
        <TextField
          label="Amount in USD"
          type="number"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
        />
        <div className="flex gap-3 items-center">
          <Typography>Convert to</Typography>

          <Select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {Object.keys(rates).map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <Typography
        className={`text-center md:text-start ${
          amount > 0 && rates[selectedCurrency] ? "" : "invisible"
        }`}
        sx={{ marginBlock: "1rem", fontSize: "1.2rem" }}
      >
        {amount} USD is equal to {amount * (rates[selectedCurrency] || 0)}{" "}
        {selectedCurrency}
      </Typography>
    </>
  );
};

export default CurrencyConverter;
