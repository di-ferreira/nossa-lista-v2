export type tUnitMeansure = {
  UNIDADE: 'uni';
  LITRO: 'l';
  KILO: 'kg';
};

export enum eUnitMeansure {
  UNIDADE = 'uni',
  LITRO = 'l',
  KILO = 'kg',
}

export const UnitMeansure: {
  label: keyof tUnitMeansure;
  value: eUnitMeansure;
}[] = Object.assign(
  [],
  Object.keys(eUnitMeansure).map((key) => ({
    label: key as keyof eUnitMeansure,
    value: eUnitMeansure[key as keyof tUnitMeansure],
  }))
);

export type ListItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: eUnitMeansure;
  purchased: boolean;
  total: number;
};

