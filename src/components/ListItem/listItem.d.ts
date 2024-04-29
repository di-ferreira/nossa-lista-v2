export enum UnitMeasure {
  UNIT = 'uni',
  LITRER = 'l',
  KILO = 'kg',
}

type ListItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: UnitMeasure;
  purchased: boolean;
};

