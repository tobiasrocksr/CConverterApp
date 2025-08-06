import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress: (value: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

});
  const renderButton = (value: string) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPress(value)}
      key={value}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {['1', '2', '3'].map(renderButton)}
      </View>
      <View style={styles.row}>
        {['4', '5', '6'].map(renderButton)}
      </View>
      <View style={styles.row}>
        {['7', '8', '9'].map(renderButton)}
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        {renderButton('0')}
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
  },
});
