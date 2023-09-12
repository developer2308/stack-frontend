import Moment from "moment";

export const formatDateTime = (timeStr) => {
  const time = Moment(timeStr).format("MMM D, YYYY \\at H:mm");
  return time;
};

export const fromNow = (timeStr) => {
  const time = Moment(timeStr).fromNow();
  return time;
};

export const titleStr = (title) => {
  if (!title) {
    return ''
  }
  const removePattern = [/[^a-zA-Z0-9 ]/gi];
  removePattern.forEach((pattern) => {
    title = title.replace(pattern, "");
  });
  return title.toLowerCase().split(" ").join("-");
};

export const formatNumber = (number) => {
  if (number) {
    const formated = number.toLocaleString("en-US");
    return formated;
  } else {
    return 0;
  }
};

export const splitToWords = (query) => {
  return query.split(" ").filter((w) => !!w);
};

export const formatCount = (num, digits = 0) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const getSiteInfo = () => {
  const name = localStorage.getItem("site_name") || "StackOverflow";
  const id = localStorage.getItem("site_id") || 1;
  return { id, name };
};

export const setSiteInfo = (site) => {
  localStorage.setItem("site_name", site["Name"]);
  localStorage.setItem("site_id", site["Id"]);
};
