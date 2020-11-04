const elements = require("./../elements");

const stockListView = (element) => {
  const nameMarkup = `<div class="list-item"> <div>${element.stock_name}</div> </div>`;
  const priceMarkup = `<div class="list-item"> <span>Rs : </span> <div>${element.stock_price}</div> </div>`;
  const quantityMarkup = `<div class="list-item"> <div >${element.stock_quantity}</div> <span>qty</span> </div>`;

  elements.stockNameList.insertAdjacentHTML("beforeend", nameMarkup);
  elements.stockPriceList.insertAdjacentHTML("beforeend", priceMarkup);
  elements.stockQuantityList.insertAdjacentHTML("beforeend", quantityMarkup);
};

module.exports = stockListView;
