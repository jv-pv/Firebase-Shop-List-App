import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { appendListItemsToHtml, appendDBValuesToHtml, clear } from './Assets/Utils/utils.js'

const appSettings = {
    databaseURL: "https://playground-4d045-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Shopping-List")

const addButton = document.getElementById("add-button")

addButton.addEventListener("click", function(e) {
    e.preventDefault()
    const inputFieldItemValue = document.getElementById('input-field-item').value
    const inputFieldQuantityValue = document.getElementById('input-field-quantity').value
    if (inputFieldItemValue === "" || inputFieldQuantityValue === "") {
        return 
    } else {
        appendListItemsToHtml(inputFieldItemValue, inputFieldQuantityValue)
        let listItem = `${inputFieldItemValue} x ${inputFieldQuantityValue} `
        push(shoppingListInDB, listItem)
    }
})

onValue(shoppingListInDB, function(snapshot) {
    let shoppingListItems = Object.values(snapshot.val())
    clear()
    for (let items of shoppingListItems) {
        appendDBValuesToHtml(items)
    }
    
})