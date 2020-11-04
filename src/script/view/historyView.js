const elements = require("./../elements");

const historyListView = (data, date = "---") => {
  const markup = `
  <div class="history-table-list">
    <div class="">${date}</div>
    <div class="">${data.item_name}</div>
    <div class="">${data.price}</div>
    <div class="">${data.discount}</div>
    <div class="">${data.quantity}</div>
    <div class="">${data.total}</div>
  </div>`;

  elements.historyListContainer.insertAdjacentHTML("afterbegin", markup);
};

module.exports = historyListView;
