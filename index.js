import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://playground-4d045-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingList = ref(database, 'Shopping-List')

const listItemsArray = []


document.addEventListener('click', (e) => {
const inputFieldBrandValue = document.getElementById('input-field-brand').value
const inputFieledItemValue = document.getElementById('input-field-item').value
const inputFieledQuantityValue = document.getElementById('input-field-quantity').value
let listItem = `${inputFieldBrandValue}: ${inputFieledItemValue} x ${inputFieledQuantityValue}`
    if (e.target.id === 'add-button') {
        if (inputFieledItemValue === "" || inputFieldBrandValue === "" || inputFieledQuantityValue === ""){
            return null
        } else {
            push(shoppingList, listItem)
            listItemsArray.push(listItem)
        }
    }
})

