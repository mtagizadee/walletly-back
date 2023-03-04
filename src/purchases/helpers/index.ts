import { Decimal } from '@prisma/client/runtime';
// string is a decimal

export const removePurchase = (currentAmount: Decimal, purchase: Decimal) => {
  return String(Number(currentAmount) - Number(purchase));
};

export const addPurchase = (currentAmount: Decimal, purchase: Decimal) => {
  return String(Number(currentAmount) + Number(purchase));
};
