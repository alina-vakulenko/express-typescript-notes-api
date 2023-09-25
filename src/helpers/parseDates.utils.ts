export const parseDates = (str: string) => {
  if (typeof str !== "string") return;
  const dateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  const dates = [];
  const matches = str.matchAll(dateRegex);
  for (const match of matches) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, month, day, year] = match;
    const dateObject = new Date(`${year}-${month}-${day}`);
    dates.push(dateObject);
  }

  return dates;
};
