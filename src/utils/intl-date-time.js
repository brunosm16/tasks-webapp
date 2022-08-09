export default () => {
  const formattedDateValues = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const browserLocale = navigator?.languages?.length
    ? navigator.languages[0]
    : navigator.language;

  const intlDateTime = new Intl.DateTimeFormat(
    browserLocale,
    formattedDateValues
  );

  return intlDateTime.format(new Date());
};
