const MILLISECONDS_IN_YEAR = 31536000000;
const MILLISECONDS_IN_MONTH = 2592000000;
const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;

const INTERVALS = [
  { label: '년', divisor: MILLISECONDS_IN_YEAR },
  { label: '달', divisor: MILLISECONDS_IN_MONTH },
  { label: '일', divisor: MILLISECONDS_IN_DAY },
  { label: '시간', divisor: MILLISECONDS_IN_HOUR },
  { label: '분', divisor: MILLISECONDS_IN_MINUTE },
];

export default function getTimeDifference(createdDate, intervals = INTERVALS) {
  const currentDate = new Date();
  const timeDifference = currentDate - createdDate;

  let result = '방금 전';
  intervals.some((interval) => {
    const value = Math.floor(timeDifference / interval.divisor);
    if (value >= 1) {
      result = `${value} ${interval.label}전`;
      return true;
    }
    return false;
  });

  return result;
}
