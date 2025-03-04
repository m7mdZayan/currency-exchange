"use client";

import React from "react";
import { TextField, Select, MenuItem, Typography } from "@mui/material";
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
    <div className="flex gap-3 items-center my-5">
      <TextField
        label="Amount in USD"
        type="number"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        //   InputProps={{
        //     startAdornment: <InputAdornment position="start">$</InputAdornment>,
        //   }}
      />
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
      <Typography>
        Converted: {amount * (rates[selectedCurrency] || 0)} {selectedCurrency}
      </Typography>
    </div>
  );
};

export default CurrencyConverter;
