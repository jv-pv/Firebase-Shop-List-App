let count = 0

function countUp() {
    count++
    return count
}

function appendListItemsToHtml(itemValue, quantityValue) {
    const shopppingListEl = document.getElementById('shopping-list')
    shopppingListEl.innerHTML += `<li><span class='list-item'>${itemValue}</span>: x ${quantityValue}`
}


export { countUp, appendListItemsToHtml }
