const elements = require("./../elements");

function setTime() {
  const date = new Date();
  const date_year = date.getFullYear();
  const date_month = date.getMonth() + 1;
  const date_date = date.getDate();

  elements.dateView.textContent = `${date_date}-${
    date_month < 10 ? "0" + date_month : date_month
  }-${date_year}`;
  elements.timeView.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = setTime;
