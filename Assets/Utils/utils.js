let count = 0
const inputFieldItem = document.getElementById('input-field-item')
const inputFieldQuantity = document.getElementById('input-field-quantity')
const shopppingListEl = document.getElementById('shopping-list')

function countUp() {
    count++
    return count
}
s
function appendListItemsToHtml(itemValue, quantityValue) {
    shopppingListEl.innerHTML += `${itemValue} x ${quantityValue} `
}

function appendDBValuesToHtml(items) {
    shopppingListEl.innerHTML += `<li>${items}</li>`
}


function clear() {
    inputFieldItem.value = ""
    inputFieldQuantity.value = ""
    shopppingListEl.innerHTML = ""
}

export { countUp, appendListItemsToHtml, appendDBValuesToHtml, clear}