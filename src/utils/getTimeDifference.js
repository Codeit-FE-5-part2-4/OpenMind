const MILLISECONDS_IN_YEAR = 31536000000;
const MILLISECONDS_IN_MONTH = 2592000000;
const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;

const INTERVALS = [
  { label: "년", divisor: MILLISECONDS_IN_YEAR },
  { label: "달", divisor: MILLISECONDS_IN_MONTH },
  { label: "일", divisor: MILLISECONDS_IN_DAY },
  { label: "시간", divisor: MILLISECONDS_IN_HOUR },
  { label: "분", divisor: MILLISECONDS_IN_MINUTE },
];

export default function getTimeDifference(createdDate, intervals = INTERVALS) {
  const currentDate = new Date();
  const timeDifference = currentDate - createdDate;

  console.log(currentDate);
  console.log(timeDifference);

  for (const interval of intervals) {
    const value = Math.floor(timeDifference / interval.divisor);
    if (value >= 1) {
      return `${value} ${interval.label}전`;
    }
  }

  return "방금 전";
}
