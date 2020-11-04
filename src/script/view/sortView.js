const elements = require("./../elements");

const dropDownSort = (value) => {
  markup = `<option value="${value}">${value}</option>`;
  elements.priceSortDropDown.insertAdjacentHTML("afterbegin", markup);
};

module.exports = dropDownSort;
