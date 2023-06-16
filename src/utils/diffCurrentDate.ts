export const diffCurrentDate = (date: string) => {
  const oldDate = new Date();
  const newDate = new Date(date);
  let diff = Math.abs(newDate.getTime() - oldDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diff;
};
