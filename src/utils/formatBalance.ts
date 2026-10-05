export const formatBalance = (str: number): string => {
  if (str === undefined || null) {
    return '0,00';
  }
  return str.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
