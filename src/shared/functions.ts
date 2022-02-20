/**
 * @param createdAt number of milliseconds since January 1, 1970
 * @returns how much time ago was `createdAt`, e.g. `'5 seconds ago'` | `'2 weeks ago'` | `'5 years ago'`
 */
export const getTimeAgo = (createdAt: number) => {
  console.log(createdAt);
  const secondsAgo = Math.floor((Date.now() - createdAt) / 1000);
  const minutesAgo = secondsAgo / 60;
  const hoursAgo = minutesAgo / 60;
  const daysAgo = hoursAgo / 24;
  const weekAgo = daysAgo / 7;
  const monthsAgo = daysAgo / 30;
  const yearsAgo = monthsAgo / 12;

  if (yearsAgo >= 1) {
    return `${Math.floor(yearsAgo)} ${yearsAgo >= 2 ? 'years' : 'year'} ago`;
  }

  if (monthsAgo >= 1) {
    return `${Math.floor(monthsAgo)} ${
      monthsAgo >= 2 ? 'months' : 'month'
    } ago`;
  }

  if (weekAgo >= 1) {
    return `${Math.floor(weekAgo)} ${weekAgo >= 2 ? 'weeks' : 'week'} ago`;
  }

  if (daysAgo >= 1) {
    return `${Math.floor(daysAgo)} ${daysAgo >= 2 ? 'days' : 'day'} ago`;
  }

  if (hoursAgo >= 1) {
    return `${Math.floor(hoursAgo)} ${hoursAgo >= 2 ? 'hours' : 'hour'} ago`;
  }

  if (minutesAgo >= 1) {
    return `${Math.floor(minutesAgo)} ${
      minutesAgo >= 2 ? 'minutes' : 'minute'
    } ago`;
  }
  return `${secondsAgo} ${secondsAgo >= 2 ? 'seconds' : 'second'} ago`;
};
