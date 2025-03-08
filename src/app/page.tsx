import CurrencyContainer from "./components/currencyContainer";
import { fetchExchangeRates } from "./utils/api";

export default async function Home() {
  const rates = await fetchExchangeRates();

  if (!rates) {
    throw new Error("Failed to load exchange rates. Please try again later.");
  } // throw error to show the error.tsx page

  return (
    <div className="container mx-auto max-w-[750px]">
      <CurrencyContainer initialRates={rates} />
    </div>
  );
}
