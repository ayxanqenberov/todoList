const addForm = document.querySelector("#todoAddForm")
const todoAdding = document.querySelector("#todoName")
const listgroup = document.querySelector(".list-group")
const searching = document.querySelector("#todoSearch")
addForm.addEventListener("submit", getAdd)

// bir todo elave etmek ucun
function getAdd(e) {
  e.preventDefault()
  let data = JSON.parse(localStorage.getItem("todo")) || []
  if (!todoAdding.value.trim()) {
    alert("bir sey yaz ")
  } else {
    data.push(todoAdding.value)

  }
  localStorage.setItem("todo", JSON.stringify(data))
  todoAdding.value = ""
  toDoListVisible()
}

// yaradilmis todo listesinin goruntusu
function toDoListVisible() {
  listgroup.innerHTML = ""
  const todo = JSON.parse(localStorage.getItem("todo")) || []

  if (todo != []) {
    todo.forEach((item, index) => {
      listgroup.innerHTML += `
        <li ondblclick="getComplete('${item}')" class="list-group-item d-flex justify-content-between">${item}
        <div class="sala d-flex  align-items-center">
          <svg class="editing" onclick="(getModal('${item}',${index}))" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
         <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
         </svg>
           <a href="#" onclick="removeItem(${index})"class="delete-item mx-3">
             <i class="fa fa-remove rovshan"></i>
           </a>
            </div>
         </li>
       `
    })
  }
}
// statistika


// tamamlamaq ucun
function getComplete(item) {
  item.style.color = "red"
  toDoListVisible()
}
// elave edilen bir todo'nu silmek ucun
function removeItem(index) {
  let todo = JSON.parse(localStorage.getItem("todo")) || [];
  todo.splice(index, 1)
  localStorage.setItem("todo", JSON.stringify(todo))
  toDoListVisible()
}

// elave edilen butun todolari silmek ucun
document.getElementById("todoClearButton").addEventListener("click", () => {
  localStorage.clear("todo")
  toDoListVisible()
})

// her hansi bir todonu redakte etmek ucun
let editModal = document.getElementById("modal-special")
function getModal(item, index) {
  editModal.innerHTML = ""
  editModal.innerHTML = `
  <div id="modalDiv">
        <i onclick="closedModal()" class="close fa-solid fa-xmark"></i>
        <input id="newValue" type="text" value="${item}">
        <button id="saveBttn" onclick="savedValue('${index}')">Save</button>
    </div>
  `
  editModal.style.display = "flex"
}
// bir yazi daxil edilmediyinde error versin  
function alerts() {
  editModal.innerHTML = ""
  editModal.innerHTML = `
  <div class="alert container d-flex align-items-center justify-content-around">
        <p class="m-0">Zehmet olmasa bir deyer daxil edin</p>
        <i class="alertIcon fa-solid fa-triangle-exclamation"></i>
    </div>
  `
  editModal.style.display = "flex"
}
function closedModal() {
  editModal.style.display = "none"
}
function savedValue(index) {
  let todo = JSON.parse(localStorage.getItem("todo")) || []
  let newValues = document.getElementById("newValue").value
  try {
    if (!newValues.trim()) {
      throw new Error(alerts())
    } else {
      todo.splice(index, 1, `${newValues}`)
      localStorage.setItem("todo", JSON.stringify(todo))
      toDoListVisible()
      closedModal()
    }
  } catch (err) {
    err.message
  }

}
// search

function searchAlert() {
  editModal.innerHTML = `
  <div class="alert container d-flex align-items-center justify-content-around">
        <p class="m-0">Melumat tapilmadi</p>
        <i class="alertIcon fa-solid fa-triangle-exclamation"></i>
    </div>
  `;
  editModal.style.display = "flex";
}
searching.addEventListener("input", getSearch);
function getSearch() {
  let todo = JSON.parse(localStorage.getItem("todo")) || [];
  let searchTerm = searching.value.toLowerCase();
  let filterData = todo.filter(item => item.toLowerCase().includes(searchTerm));

  if (filterData.length > 0) {
    listgroup.innerHTML = filterData.map(item => `
      <li class="list-group-item d-flex justify-content-between">${item}
        <div class="d-flex align-items-center">
          <svg class="editing" onclick="getModal('${item}')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
          </svg>
          <a href="#" onclick="removeItem(${todo.indexOf(item)})" class="delete-item mx-3">
            <i class="fa fa-remove rovshan"></i>
          </a>
        </div>
      </li>
    `).join("");    
    editModal.style.display = "none";
  } else {
    searchAlert();
    listgroup.innerHTML = "";
  }
}
// her zaman listin goruntusu olsun
toDoListVisible()