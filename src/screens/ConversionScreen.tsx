import { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import NumPad from '../components/NumPad';
import { useRates } from '../context/RatesContext';
import { formatNumber } from '../utils/formatters';
import { getFlagPath } from '../utils/currencies';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Conversion'>;
  route: {
    params?: {
      selectedCurrency?: string;
      isSource?: boolean;
    };
  };
};

export const ConversionScreen: React.FC<Props> = ({ navigation, route }) => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const { rates, loading, updateRates } = useRates();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (route.params?.selectedCurrency && route.params?.isSource !== undefined) {
      if (route.params.isSource) {
        setFromCurrency(route.params.selectedCurrency);
      } else {
        setToCurrency(route.params.selectedCurrency);
      }
    }
  }, [route.params]);

  useEffect(() => {
    updateRates(fromCurrency);
  }, [fromCurrency, updateRates]);

  const handleNumPadPress = useCallback((value: string) => {
    setAmount(prev => {
      if (prev.includes('.') && value === '.') return prev;
      if (prev === '0' && value !== '.') return value;
      return prev + value;
    });
  }, []);

  const handleDelete = useCallback(() => {
    setAmount(prev => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setAmount('');
  }, []);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(prev => toCurrency);
    setToCurrency(prev => fromCurrency);
  }, [fromCurrency, toCurrency]);

  const convertedAmount = Number(amount) * (rates[toCurrency] || 0);

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000' : '#fff' }
    ]}>
      <View style={styles.conversionContainer}>
        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => navigation.navigate('CurrencyList', { isSource: true })}
        >
          <Text style={[styles.currencyText, { color: isDarkMode ? '#fff' : '#000' }]}>
            {fromCurrency}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.swapButton}
          onPress={handleSwapCurrencies}
        >
          <Text style={styles.swapButtonText}>⇄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => navigation.navigate('CurrencyList', { isSource: false })}
        >
          <Text style={[styles.currencyText, { color: isDarkMode ? '#fff' : '#000' }]}>
            {toCurrency}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isDarkMode ? '#fff' : '#000' }]}>
          {amount || '0'}
        </Text>
        <Text style={[styles.convertedAmount, { color: isDarkMode ? '#ccc' : '#666' }]}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            formatNumber(convertedAmount)
          )}
        </Text>
      </View>

      <NumPad
        onPress={handleNumPadPress}
        onDelete={handleDelete}
        onClear={handleClear}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conversionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  currencySelector: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minWidth: 100,
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 20,
    fontWeight: '600',
  },
  swapButton: {
    padding: 12,
    borderRadius: 8,
  },
  swapButtonText: {
    fontSize: 24,
  },
  amountContainer: {
    padding: 24,
    alignItems: 'center',
  },
  amount: {
    fontSize: 48,
    fontWeight: '600',
    marginBottom: 8,
  },
  convertedAmount: {
    fontSize: 24,
  },
});
