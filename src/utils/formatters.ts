export const formatNumber = (value: string | number): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';

  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }

  if (num === 0) return '0';
  
  // Handle small numbers
  if (num < 0.01 && num > 0) {
    return num.toExponential(2);
  }

  // Regular numbers
  const parts = num.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const parseInputAmount = (input: string): number => {
  return parseFloat(input.replace(/[^0-9.]/g, '')) || 0;
};
