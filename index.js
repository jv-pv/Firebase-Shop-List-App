import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import {countUp, appendListItemsToHtml} from './Assets/Utils/utils.js'

const appSettings = {
    databaseURL: "https://playground-4d045-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Shopping-List")

const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function(e) {
    e.preventDefault()
    let count = countUp()
    let inputFieldItemValue = document.getElementById('input-field-item').value
    let inputFieldQuantityValue = document.getElementById('input-field-quantity').value

    if (inputFieldItemValue === "" || inputFieldQuantityValue === "") {
        return 
    } else {
        appendListItemsToHtml(inputFieldItemValue, inputFieldQuantityValue)
        let listItem = ` item ${count}) ${inputFieldItemValue}, quantity: ${inputFieldQuantityValue} `
        push(shoppingListInDB, listItem)
    }
})