const getQuarter = (date = new Date()) => Math.ceil(date.getMonth() / 3);

export const year = new Date().getFullYear();
export const currentQuarter = getQuarter();

export const yearQuarterUrlFragment = `${year}/${currentQuarter}`;
export const twoDigitYear = year.toString().slice(year.toString().length - 2);