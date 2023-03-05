import { THistoryDuration } from '../types/history-duration.type';

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
