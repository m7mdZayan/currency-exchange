import CurrencyContainer from "./components/currencyContainer";
import CustomThemeProvider from "./components/themeProvider";

type ExchangeRates = {
  [key: string]: number;
};

export default async function Home() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
    cache: "no-store", // Ensures fresh data on each request
  });
  const data: { rates: ExchangeRates } = await res.json();

  return (
    <CustomThemeProvider>
      <div className="container mx-auto max-w-[750px]">
        <CurrencyContainer initialRates={data.rates} />
      </div>
    </CustomThemeProvider>
  );
}
