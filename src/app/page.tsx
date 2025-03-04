import CurrencyTable from "./components/CurrencyTable";

type ExchangeRates = {
  [key: string]: number;
};

export default async function Home() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
    cache: "no-store", // Ensures fresh data on each request
  });
  const data: { rates: ExchangeRates } = await res.json();

  return (
    <div className="">
      <CurrencyTable rates={data.rates} />
    </div>
  );
}
