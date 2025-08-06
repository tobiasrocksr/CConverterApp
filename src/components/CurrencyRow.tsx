import React, { memo } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getFlagPath } from '../utils/currencies';

interface Props {
  code: string;
  name: string;
  onSelect: () => void;
}

const CurrencyRowComponent: React.FC<Props> = ({ code, name, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Image
        source={getFlagPath(code)}
        style={styles.flag}
      />
      <View style={styles.textContainer}>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  flag: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
  },
  code: {
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export const CurrencyRow = memo(CurrencyRowComponent);
