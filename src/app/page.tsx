import { Divider } from "@mui/material";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyConverter from "./components/currencyConverter";

type ExchangeRates = {
  [key: string]: number;
};

export default async function Home() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
    cache: "no-store", // Ensures fresh data on each request
  });
  const data: { rates: ExchangeRates } = await res.json();

  return (
    <div className="container mx-auto max-w-[750px]">
      <CurrencyConverter rates={data.rates} />
      <Divider></Divider>
      <CurrencyTable rates={data.rates} />
    </div>
  );
}
