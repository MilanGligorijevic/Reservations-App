function getWorkingHours(opening: number, closing: number) {
  const hours: Array<number> = [];
  while (opening <= closing) {
    hours.push(opening);
    opening++;
  }
  return hours;
}

function isValidPhoneNumber(input: string) {
  const regex = /^[+]?\d+$/;
  return regex.test(input);
}

export { getWorkingHours, isValidPhoneNumber };
