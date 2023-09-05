import Moment from "moment";

export const formatDateTime = (timeStr) => {
  const time = Moment(timeStr).format("MMM D, YYYY \\at H:mm");
  return time;
};

export const fromNow = (timeStr) => {
    const time = Moment(timeStr).fromNow();
    return time;
  };

export const formatNumber = (number) => {
  if (number) {
    const formated = number.toLocaleString("en-US");
    return formated;
  } else {
    return "";
  }
};
