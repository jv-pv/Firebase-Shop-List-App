import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { countUp, appendListItemsToHtml, appendDBValuesToHtml, clearListItem } from './Assets/Utils/utils.js'

const appSettings = {
    databaseURL: "https://playground-4d045-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Shopping-List")

const addButton = document.getElementById("add-button")

addButton.addEventListener("click", function(e) {
    e.preventDefault()
    let count = countUp()
    const inputFieldItemValue = document.getElementById('input-field-item').value
    const inputFieldQuantityValue = document.getElementById('input-field-quantity').value
    if (inputFieldItemValue === "" || inputFieldQuantityValue === "") {
        return 
    } else {
        clearListItem()
        appendListItemsToHtml(count, inputFieldItemValue, inputFieldQuantityValue)
        let listItem = `Type: ${inputFieldItemValue}, Quantity: ${inputFieldQuantityValue} `
        push(shoppingListInDB, listItem)
    }
})

onValue(shoppingListInDB, function(snapshot) {
    let shoppingListItems = Object.values(snapshot.val())
    clearListItem()
    for (let items of shoppingListItems) {
        appendDBValuesToHtml(items)
    }
    
})