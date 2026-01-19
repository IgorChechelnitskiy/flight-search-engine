export interface AmadeusPriceModel {
  currency: string;
  total: string;
  base: string;
  fees?: { amount: string; lookupKey: string }[];
  grandTotal: string;
}
