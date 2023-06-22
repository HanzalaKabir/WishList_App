let todoInput = document.querySelector(".input");
let todoBtn = document.querySelector(".button");
let showtodos = document.querySelector(".todos-container");
let todo = "";
let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
todoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todo = todoInput.value;
  if (todo.length > 0) {
    todoList.push({ id: uuid(), todo, isCompleted: false });
  }
  renderTodoList(todoList);
  localStorage.setItem("todo", JSON.stringify(todoList));
  todoInput.value = "";
});
showtodos.addEventListener("click", (e) => {
  let key = e.target.dataset.key;
  let delTodo = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todoList = todoList.filter((todo) => todo.id !== delTodo);
  localStorage.setItem("todo", JSON.stringify(todoList));
  renderTodoList(todoList);
});
function renderTodoList(todoList) {
  // console.log(todoList);
  showtodos.innerHTML = todoList.map(
    ({ id, todo, isCompleted }) =>
      `<div class="relative"><input class="t-checkbox" type="checkbox" data-key=${id} ${
        isCompleted ? "checked" : ""
      }><label  class="todo todo-text t-pointer ${
        isCompleted ? "checked-todo" : ""
      }" data-key=${id}>${todo}</label><button class="absolute right-0 button cursor" ><span data-todokey=${id} class="material-icons-outlined del-btn">delete</span></button></div>`
  );
}
renderTodoList(todoList);
