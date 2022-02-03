import dayjs from "dayjs";

export const dateFormat = (date) => {
  const defaultDate = dayjs(date, "DD/MM/YYYY");

  return defaultDate.format("DD-MM-YYYY");
};

export const numberFormat = (value) => {
  return new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(value);
};
