import axios from 'axios';

interface ExchangeRateResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

export const fetchRates = async (base: string): Promise<Record<string, number>> => {
  try {
    const response = await axios.get<ExchangeRateResponse>(
      `https://api.exchangerate.host/latest?base=${base}`
    );
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};
