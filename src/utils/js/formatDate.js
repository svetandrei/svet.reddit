import moment from "moment";

export function formatDate(date) {
  const date1 = moment(date *1000).locale('ru');
  const date2 = moment(new Date()).locale('ru');
  return date2.from(date1, true);
}
