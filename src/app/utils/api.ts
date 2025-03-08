export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
    if (!response.ok) throw new Error("Failed to fetch exchange rates");

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null; // Return null to indicate failure
  }
};
