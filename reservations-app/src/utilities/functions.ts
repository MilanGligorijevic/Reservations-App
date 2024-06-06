import Local from "../types/local";

function getWorkingHours(opening: number, closing: number) {
  const hours: Array<number> = [];
  while (opening <= closing) {
    hours.push(opening);
    opening++;
  }
  return hours;
}

function isValidPhoneNumber(input: string) {
  const regex = /^[+]?\d+(\s\d+)*$/;
  return regex.test(input);
}

function searchLocalsByInput(input: string, locals: Local[]) {
  const resultArray = locals.filter((local) => {
    return local.name.toLocaleLowerCase().includes(input);
  }); //mozda implementirati i pretragu po tagovima lokala
  return resultArray;
}

export { getWorkingHours, isValidPhoneNumber, searchLocalsByInput };
