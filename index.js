import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { setListItemsToHtml, clear } from './Assets/Utils/utils.js'

const appSettings = {
    databaseURL: "https://playground-4d045-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Shopping-List")
const shopppingListEl = document.getElementById('shopping-list')

const addButton = document.getElementById("add-button")

addButton.addEventListener("click", (e) => {
    e.preventDefault()
    const inputFieldItemValue = document.getElementById('input-field-item').value
    const inputFieldQuantityValue = document.getElementById('input-field-quantity').value
    if (inputFieldItemValue === "" || inputFieldQuantityValue === "") {
        return 
    } else {
        setListItemsToHtml(inputFieldItemValue, inputFieldQuantityValue)
        let listItem = `${inputFieldItemValue} x ${inputFieldQuantityValue} `
        push(shoppingListInDB, listItem)
    }
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists() === true) {
        let shoppingListItems = Object.entries(snapshot.val())
        clear()
    for (let i = 0; i < shoppingListItems.length; i++) {
                let currentItems = shoppingListItems[i]
                appendDBValuesToHtml(currentItems)
        }
    } else {
        shopppingListEl.innerHTML = "<p class='empty-list'>No Items</p>"
    }
})


function appendDBValuesToHtml(items) {
    let listEl = document.createElement('li')

    let itemId = items[0]
    let itemValue = items[1] 

    listEl.textContent = itemValue

    listEl.addEventListener('dblclick', () => {
        let listItemIDLocation = ref(database, `Shopping-List/${itemId}`)
        clear()
        remove(listItemIDLocation)
    })
    
    shopppingListEl.append(listEl)
}


function removeListItem() {

}