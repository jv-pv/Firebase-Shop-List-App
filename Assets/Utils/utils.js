const inputFieldItem = document.getElementById('input-field-item')
const inputFieldQuantity = document.getElementById('input-field-quantity')
const shopppingListEl = document.getElementById('shopping-list')

function setListItemsToHtml(selectFromValue ,itemValue, quantityValue) {
    shopppingListEl.innerHTML += `${selectFromValue}: ${itemValue} x ${quantityValue} `
}

function clear() {
    inputFieldItem.value = ""
    inputFieldQuantity.value = ""
    shopppingListEl.innerHTML = ""
}

export { setListItemsToHtml, clear }