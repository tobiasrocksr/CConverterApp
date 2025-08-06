import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  useColorScheme,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { currencies } from '../utils/currencies';
import { CurrencyRow } from '../components/CurrencyRow';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CurrencyList'>;
  route: { params: { isSource: boolean } };
};

export const CurrencyListScreen: React.FC<Props> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const filteredCurrencies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return currencies.filter(
      currency =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelect = useCallback((code: string) => {
    navigation.navigate('Conversion', {
      selectedCurrency: code,
      isSource: route.params.isSource,
    });
  }, [navigation, route.params.isSource]);

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000' : '#fff' }
    ]}>
      <TextInput
        style={[
          styles.searchInput,
          { 
            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
            color: isDarkMode ? '#fff' : '#000'
          }
        ]}
        placeholder="Search currency..."
        placeholderTextColor={isDarkMode ? '#999' : '#666'}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus
        clearButtonMode="while-editing"
      />
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CurrencyRow
            code={item.code}
            name={item.name}
            onSelect={() => handleSelect(item.code)}
          />
        )}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
