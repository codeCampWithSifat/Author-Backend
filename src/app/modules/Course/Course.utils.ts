/* eslint-disable @typescript-eslint/no-explicit-any */
const calculateDurationInWeeks = (startDate: string, endDate: string) => {
  const start: any = new Date(startDate);
  const end: any = new Date(endDate);
  const diffInMs = end - start;
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
  const durationInWeeks = diffInMs / millisecondsInWeek;
  return Math.ceil(durationInWeeks);
};

export default calculateDurationInWeeks;
