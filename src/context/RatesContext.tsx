import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchRates } from '../services/exchangeApi';
import { saveRates, loadRates } from '../utils/storage';
import { Alert } from 'react-native';

interface RatesContextType {
  rates: Record<string, number>;
  loading: boolean;
  error: string | null;
  updateRates: (base: string) => Promise<void>;
}

const RatesContext = createContext<RatesContextType>({
  rates: {},
  loading: false,
  error: null,
  updateRates: async () => {},
});

export const useRates = () => useContext(RatesContext);

export const RatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRates = useCallback(async (base: string) => {
    setLoading(true);
    setError(null);

    try {
      // Try to load from cache first
      const cachedRates = await loadRates(base);
      if (cachedRates) {
        setRates(cachedRates);
        setLoading(false);
        return;
      }

      // Fetch fresh rates if no cache or cache expired
      const freshRates = await fetchRates(base);
      setRates(freshRates);
      await saveRates(base, freshRates);
    } catch (err) {
      const message = 'Failed to fetch exchange rates';
      setError(message);
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <RatesContext.Provider value={{ rates, loading, error, updateRates }}>
      {children}
    </RatesContext.Provider>
  );
};
