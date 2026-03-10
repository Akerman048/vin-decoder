export type DecodeResultItem = {
  Variable: string;
  Value: string | null;
  VariableId: number;
};

export type DecodeVinResponse = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: DecodeResultItem[];
};

export type VehicleVariable = {
  ID: number;
  Name: string;
  Description: string;
  DataType?: string;
  GroupName?: string;
};

export type VehicleVariablesResponse = {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: VehicleVariable[];
};