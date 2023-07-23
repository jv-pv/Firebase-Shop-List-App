import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { setListItemsToHtml, clear } from "./Assets/Utils/utils.js";

const appSettings = {
  databaseURL: "https://playground-4d045-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "Shopping-List");
const shopppingListEl = document.getElementById("shopping-list");

const clearButton = document.querySelector(".clear-button");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputFieldItemValue = document.getElementById("input-field-item").value;
  const inputFieldQuantityValue = document.getElementById(
    "input-field-quantity"
  ).value;
  const selectFromValue = document.getElementById("select-from").value;
  if (
    inputFieldItemValue.trim() !== "" &&
    inputFieldQuantityValue.trim() !== "" &&
    selectFromValue !== "null"
  ) {
    setListItemsToHtml(
      selectFromValue,
      inputFieldItemValue,
      inputFieldQuantityValue
    );
    let storeInDB = ref(database, `Shopping-List/${selectFromValue}`);
    push(storeInDB, {
      item: inputFieldItemValue,
      quantity: inputFieldQuantityValue,
      isChecked: false,
    });
  }
});

clearButton.addEventListener("dblclick", removeListItems);

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingListItems = Object.entries(snapshot.val());
    clearButton.classList.remove("hidden");
    formEl.reset();
    clear();
    shoppingListItems.forEach(([storeName, storeItem]) => {
      appendDBValuesToHtml(storeName, storeItem);
    });
  } else {
    shopppingListEl.innerHTML = "<p class='empty-list'>No Items</p>";
    clearButton.classList.add("hidden");
  }
});

function appendDBValuesToHtml(storeName, storeItem) {
  let listWrapper = document.createElement("div");
  let storeUl = document.createElement("ul");
  let storeH2 = document.createElement("h2");

  listWrapper.className = "list-wrapper";
  storeUl.className = "ul-sublist";
  storeH2.className = "list-title";

  storeH2.innerText = `${storeName}:`;
  listWrapper.appendChild(storeH2);
  listWrapper.appendChild(storeUl);
  
  let items = Object.entries(storeItem);

  items.forEach(([itemId, itemDetails]) => {
    let listEl = document.createElement("li");

    listEl.setAttribute("data-check", itemId);
    listEl.innerText = `${itemDetails.item} x ${itemDetails.quantity}`;

    if (itemDetails.isChecked) { 
      listEl.classList.add('checked');
    }

    listEl.addEventListener("dblclick", () => {
      let itemRef = ref(database, `Shopping-List/${storeName}/${itemId}`);
      remove(itemRef);
    });

    listEl.addEventListener("click", (e) => {
      if (e.target.dataset.check) {
        let itemId = e.target.dataset.check;
        let itemDetails;

        items.forEach(([id, details]) => {
          if (id === itemId) {
            itemDetails = details;
          }
        });

        let itemRef = ref(database, `Shopping-List/${storeName}/${itemId}`);

        itemDetails.isChecked = !itemDetails.isChecked;

        console.log(itemDetails.isChecked);

        update(itemRef, { isChecked: itemDetails.isChecked });
      }
    });
    itemDetails.isChecked
      ? listEl.classList.add("checked")
      : listEl.classList.remove("checked");

    storeUl.append(listEl);
  });

  shopppingListEl.appendChild(listWrapper);
}

function removeListItems() {
  clear();
  remove(shoppingListInDB);
}
