export interface Meter {
  id: string;
  _type: string[];
  area: { id: string };
  installation_date: string;
  is_automatic: boolean;
  initial_values: number[];
  description: string;
}

export interface Area {
  id: string;
  number: number;
  str_number_full: string;
  house: {
    address: string;
  };
}

export interface MeterWithArea {
  id: string;
  description: string;
  initial_values: number[];
  installation_date: string | null;
  is_automatic: boolean | null;
  _type: string[];
  area: {
    str_number_full: string;
    house: {
      address: string;
    };
  };
}
