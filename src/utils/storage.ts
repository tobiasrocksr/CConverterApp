import AsyncStorage from '@react-native-async-storage/async-storage';

const RATES_KEY_PREFIX = '@CurrencyConverter:rates:';
const EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

interface StoredRates {
  rates: Record<string, number>;
  timestamp: number;
}

export const saveRates = async (base: string, rates: Record<string, number>): Promise<void> => {
  try {
    const data: StoredRates = {
      rates,
      timestamp: Date.now()
    };
    await AsyncStorage.setItem(
      `${RATES_KEY_PREFIX}${base}`,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error('Error saving rates:', error);
    throw new Error('Failed to save exchange rates');
  }
};

export const loadRates = async (base: string): Promise<Record<string, number> | null> => {
  try {
    const data = await AsyncStorage.getItem(`${RATES_KEY_PREFIX}${base}`);
    if (!data) return null;

    const storedData: StoredRates = JSON.parse(data);
    const isExpired = Date.now() - storedData.timestamp > EXPIRY_TIME;

    return isExpired ? null : storedData.rates;
  } catch (error) {
    console.error('Error loading rates:', error);
    return null;
  }
};

// Save favorite currency pairs
export const saveFavorite = async (from: string, to: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const pair = `${from}-${to}`;
    if (!favorites.includes(pair)) {
      favorites.push(pair);
      await AsyncStorage.setItem('@CurrencyConverter:favorites', JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
};

export const getFavorites = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem('@CurrencyConverter:favorites');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

// Save conversion history
interface ConversionHistory {
  from: string;
  to: string;
  amount: number;
  result: number;
  date: number;
}

export const saveToHistory = async (conversion: Omit<ConversionHistory, 'date'>): Promise<void> => {
  try {
    const history = await getHistory();
    const newEntry = { ...conversion, date: Date.now() };
    history.unshift(newEntry);
    // Keep only last 10 entries
    const trimmedHistory = history.slice(0, 10);
    await AsyncStorage.setItem('@CurrencyConverter:history', JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

export const getHistory = async (): Promise<ConversionHistory[]> => {
  try {
    const data = await AsyncStorage.getItem('@CurrencyConverter:history');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};
