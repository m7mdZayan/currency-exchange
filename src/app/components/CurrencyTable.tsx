"use client";

import React from "react";
import { useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  InputAdornment,
  TableSortLabel,
  Button,
} from "@mui/material";

type ExchangeRates = {
  [key: string]: number;
};

interface ICurrencyTable {
  rates: ExchangeRates;
}

const CurrencyTable: React.FC<ICurrencyTable> = ({ rates }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"code" | "rate">("code");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredRates = Object.entries(rates)
    .filter(([code]) => code.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const [keyA, valueA] = a;
      const [keyB, valueB] = b;

      if (sortBy === "code") {
        return sortOrder === "asc"
          ? keyA.localeCompare(keyB)
          : keyB.localeCompare(keyA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

  const handleSort = (column: "code" | "rate") => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const resetSorting = () => {
    setSortBy("code");
    setSortOrder("asc");
  };

  return (
    <div className="my-4">
      <Typography variant="h4" gutterBottom>
        Currency Exchange Rates
      </Typography>

      <TextField
        label="Filter by currency code"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />

      <Button variant="outlined" color="secondary" onClick={resetSorting}>
        Reset Sorting
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "code"}
                  direction={sortOrder}
                  onClick={() => handleSort("code")}
                >
                  Currency
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "rate"}
                  direction={sortOrder}
                  onClick={() => handleSort("rate")}
                >
                  Exchange Rate
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRates.map(([code, rate]) => (
              <TableRow key={code}>
                <TableCell>{code}</TableCell>
                <TableCell>{rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CurrencyTable;
