let count = 0
const inputFieldItem = document.getElementById('input-field-item')
const inputFieldQuantity = document.getElementById('input-field-quantity')
const shopppingListEl = document.getElementById('shopping-list')

function countUp() {
    count++
    return count
}

function appendListItemsToHtml(count, itemValue, quantityValue) {
    shopppingListEl.innerHTML += `<li> Type: <i>${itemValue}</i> <span class="list-item">Quantity: <i>${quantityValue}<i></span></li>`
}

function appendDBValuesToHtml(items) {
    shopppingListEl.innerHTML += `<li>${items}</li>`
}

function clearListItem() {
    inputFieldItem.value = ""
    inputFieldQuantity.value = ""
}

export { countUp, appendListItemsToHtml, appendDBValuesToHtml, clearListItem }