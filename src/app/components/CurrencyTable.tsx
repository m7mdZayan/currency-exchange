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
  TableSortLabel,
  Button,
  TablePagination,
  Card,
} from "@mui/material";
import { rowsPerPageOptions } from "../utils/data";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card className="p-5 my-2" sx={{ borderRadius: "10px" }}>
      <Typography variant="h4" gutterBottom>
        Currency Exchange Rates Table
      </Typography>
      <div className="flex justify-between items-center mb-2">
        <TextField
          label="Filter by currency code"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />

        <Button variant="outlined" color="secondary" onClick={resetSorting}>
          Reset Sorting
        </Button>
      </div>

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
            {filteredRates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([code, rate]) => (
                <TableRow key={code}>
                  <TableCell>{code}</TableCell>
                  <TableCell>{rate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredRates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default CurrencyTable;
