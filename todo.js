const addForm = document.querySelector("#todoAddForm")
const todoAdding = document.querySelector("#todoName")
const listgroup = document.querySelector(".list-group")
const searching = document.querySelector("#todoSearch")
addForm.addEventListener("submit", getAdd)
let data = []
function getAdd(e) {
  e.preventDefault()
  data.push(todoAdding.value)
  localStorage.setItem('tasks',JSON.stringify(data))
  addingOnList(data)
  todoAdding.value = ""
}
function addingOnList(data) {
  listgroup.innerHTML = ""
  data.map((item, index) => {
    listgroup.innerHTML += `
        <li class="list-group-item d-flex justify-content-between gap-3">${item}
          <div class="lists d-flex align-items-center gap-3">
            <a href="" class="confirm-item">
            <?xml version="1.0" ?><svg class="feather feather-edit" fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </a>
            <a href="#" class="delete-item">
              <i id="deleteItem" class="fa fa-remove rovshan"></i> 
            </a>
          </div>
        </li>
      `
    const deleteButton = listgroup.querySelector(".delete-item");
    deleteButton.addEventListener("click", () => {
      getDelete(index);
    });
  })
}
const li = document.querySelectorAll(".list-group-item");
li.forEach((item) => {
  item.addEventListener("dblclick", () => {
    item.style.background = "green";
    item.style.fontStyle = "italic";
  });
});

searching.addEventListener("submit", getFind)
function getFind(e){
  e.preventDefault()
  if(searching.value == data.includes()){
    newData = []
    newData.push(localStorage.getItem())
    addingOnList(newData)
  }
  searching.value = ""
}

function getDelete(index) {
  data.splice(index, 1);
  localStorage.setItem('tasks',JSON.stringify(data))
  addingOnList(data);
}

document.getElementById("todoClearButton").addEventListener("click", () => {
  data = [];
  addingOnList(data)
})

