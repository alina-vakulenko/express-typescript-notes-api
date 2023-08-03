export const getFormattedDate = (
  datestring: string,
  options: Intl.DateTimeFormatOptions
) => {
  const dateToFormat = Date.parse(datestring);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat
  );
  return formattedDate;
};
