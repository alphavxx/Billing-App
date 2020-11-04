const billListBody = document.getElementById("table-bill-container");

const displayInscreen = (state) => {
  // display is screen
  const markup = `
      <div class="bill-item-list">
            <div>
              <span>${state.item_name}</span>
            </div>
            <div>
              <span>${state.price}</</span>
            </div>
            <div>
              <span>${state.quantity}</span>
            </div>
            <div>
              <span>${state.discount}</span>
            </div>
            <div>
              <span id="total">${state.total}</span>
            </div>
        </div>
        `;

  billListBody.insertAdjacentHTML("beforeend", markup);
};

module.exports = displayInscreen;
