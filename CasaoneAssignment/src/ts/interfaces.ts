export interface Inputs {
  Rent: RentOrAgeOrTenure;
  Age: RentOrAgeOrTenure;
  Zip_Code: ZipCode;
  Order_Type: OrderType;
  Tenure: RentOrAgeOrTenure;
}
export interface RentOrAgeOrTenure {
  type: string;
  min: number;
  max: number;
  unit: string;
}
export interface ZipCode {
  type: string;
  condition: string;
  unit: string;
}
export interface OrderType {
  type: string;
  options?: (string)[] | null;
  unit: string;
}
export interface Rules {
  rule: Rule;
}
export interface Rule {
  config: string;
  operand: string;
  value: string;
  nextLogical: string;
}
export interface ValidationStatus {
  status: boolean;
  errormsg: string;
}

