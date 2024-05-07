type UnitMeasure = {
  UNIT: 'uni';
  LITRER: 'l';
  KILO: 'kg';
};

export const UnitMeasure: UnitMeasure = {
  UNIT: 'uni',
  LITRER: 'l',
  KILO: 'kg',
};

export type ListItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: UnitMeansure;
  purchased: boolean;
  total: number;
};

