const fs = require("fs");
const filePath = `${__dirname}/../../../data/StockData.json`;
const elements = require("../elements");

const searchState = (searchText) => {
  const states = JSON.parse(fs.readFileSync(filePath));

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.stock_name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
  }

  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) =>
          `<option value="${match.stock_name}"><span>Price: ${match.stock_price}</span></option>`
      )
      .join("");
    elements.itemNameMatchList.innerHTML = html;
  }
};

module.exports = searchState;

// elements.itemName.addEventListener("input", () =>
//   searchState(elements.itemName.value)
// );
