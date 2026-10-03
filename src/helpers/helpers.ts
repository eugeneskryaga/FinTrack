export const capitalize = (str: string) => {
  if (!str) return str;
  return str[0].toLocaleUpperCase() + str.slice(1);
};

export const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
