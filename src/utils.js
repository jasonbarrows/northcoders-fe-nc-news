export const ago = (date) => {
  const periods = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade'];
  const lengths = ['60', '60', '24', '7', '4.35', '12', '10'];

  let difference = (new Date() - new Date(date)) / 1000;
  let period;
  for (period = 0; (difference >= lengths[period] && period < (lengths.length - 1)); period++) {
      difference /= lengths[period];
  }

  difference = Math.round(difference);

  if (difference != 1) {
    periods[period] += 's';
  }

  return (difference != 0) ? difference + ' ' + periods[period] + ' ago' : 'now';
}
