export type tUnitMeansure = {
  UNIDADE: 'uni';
  LITRO: 'l';
  KILO: 'kg';
};

enum eUnitMeansure {
  UNIDADE = 'uni',
  LITRO = 'l',
  KILO = 'kg',
}

export const UnitMeansure: {
  label: keyof tUnitMeansure;
  value: tUnitMeansure;
}[] = Object.assign(
  [],
  Object.keys(eUnitMeansure).map((key) => ({
    label: key as keyof tUnitMeansure,
    value: eUnitMeansure[key as keyof tUnitMeansure],
  }))
);

export type ListItemProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: tUnitMeansure;
  purchased: boolean;
  total: number;
};

