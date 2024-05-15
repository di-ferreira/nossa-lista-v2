import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const commaToDot = (value: string): number => {
  if (value.trim() === '' || Number.isNaN(value)) {
    value = '0,0';
  }

  let newPrice = value.replace(',', '.');
  return parseFloat(newPrice);
};

export const dotToComma = (value: number): string => {
  if (value === 0 || Number.isNaN(value)) {
    value = 0.0;
  }
  let newPrice = String(value).replace('.', ',');
  return newPrice;
};
