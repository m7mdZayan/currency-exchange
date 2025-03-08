"use client";

import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Card,
} from "@mui/material";
import { useState } from "react";
import { ExchangeRates } from "../utils/types";

interface ICurrencyConverter {
  rates: ExchangeRates;
}

const CurrencyConverter: React.FC<ICurrencyConverter> = ({ rates }) => {
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  return (
    <Card className="p-5 my-2" sx={{ borderRadius: "10px" }}>
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
            aria-label="Select currency"
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
          amount > 0 && rates[selectedCurrency] ? "" : "invisible" // only show the result if the amount is greater than 0 and the selected currency is available in the rates
        }`}
        sx={{ marginBlock: "1rem", fontSize: "1.2rem" }}
      >
        {amount} USD is equal to {amount * (rates[selectedCurrency] || 0)}{" "}
        {selectedCurrency}
      </Typography>
    </Card>
  );
};

export default CurrencyConverter;
