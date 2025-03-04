"use client";

import React from "react";
import { useState } from "react";

type ExchangeRates = {
  [key: string]: number;
};

interface ICurrencyTable {
  rates: ExchangeRates;
}

const CurrencyTable: React.FC<ICurrencyTable> = ({ rates }) => {
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  const filteredRates = Object.entries(rates).filter(([code]) =>
    code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Currency Exchange Rates</h1>

      <input
        type="text"
        placeholder="Filter by currency code"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {Object.keys(rates).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <p>
          Converted: {amount * (rates[selectedCurrency] || 0)}{" "}
          {selectedCurrency}
        </p>
      </div>

      {/* Exchange Rate Table */}
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {filteredRates.map(([code, rate]) => (
            <tr key={code}>
              <td>{code}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
