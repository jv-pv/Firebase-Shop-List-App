let count = 0
const inputFieldItem = document.getElementById('input-field-item')
const inputFieldQuantity = document.getElementById('input-field-quantity')
const shopppingListEl = document.getElementById('shopping-list')

function countUp() {
    count++
    return count
}

function setListItemsToHtml(itemValue, quantityValue) {
    shopppingListEl.innerHTML += `${itemValue} x ${quantityValue} `
}

function clear() {
    inputFieldItem.value = ""
    inputFieldQuantity.value = ""
    shopppingListEl.innerHTML = ""
}

export { countUp, setListItemsToHtml, clear }