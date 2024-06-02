function getWorkingHours(opening: number, closing: number) {
  const hours: Array<number> = [];
  while (opening <= closing) {
    hours.push(opening);
    opening++;
  }
  return hours;
}

export { getWorkingHours };
