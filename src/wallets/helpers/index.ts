import { THistoryDuration } from '../types/history-duration.type';
import { addPurchase } from '../../purchases/helpers';

const removeDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const durationType2Date = (duration: THistoryDuration) => {
  switch (duration) {
    case 'lw':
      return removeDays(7);
    case 'lm':
      return removeDays(30);
    case 'l6m':
      return removeDays(180);
    case 'ly':
      return removeDays(365);
  }
};

export const calculateStatistics = (purchases) => {
  // collect the statistics from the purchases
  const statistics = {};
  for (let i = 0; i < purchases.length; i++) {
    const purchase = purchases[i];
    const targetCategory = purchase.category.name;

    // if category does not exit the add assign amount to the category
    // else add amount to existing one
    if (
      !Object.keys(statistics).find((category) => category === targetCategory)
    ) {
      statistics[targetCategory] = purchase.amount;
    } else {
      statistics[targetCategory] = addPurchase(
        statistics[targetCategory],
        purchase.amount,
      );
    }
  }

  return statistics;
};
