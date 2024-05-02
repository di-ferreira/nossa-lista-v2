// import 'intl';
// import 'intl/locale-data/jsonp/pt-BR';
// export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
//   style: 'currency',
//   currency: 'BRL',
// });

export function currencyFormat(num: number) {
  return 'R$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

