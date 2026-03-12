const todoInput = document.getElementById("taskInput")
const addTaskButton = document.getElementById("addTaskButton")
const taskList = document.getElementById("taskList")




let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//load tasks from local storage or initialize empty array
tasks.forEach(task => renderTasks(task))//loop through tasks and create list items
 

//Add Task on Enter Key Press
todoInput.addEventListener("keydown", (e) => { if(e.key === "Enter") { 
    addTaskButton.click()
} })//add task on Enter key press



addTaskButton.addEventListener("click", () => {
    let taskText = todoInput.value.trim()//get input value and remove extra spaces
    if (taskText === "") return;
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
 }
    tasks.push(task)//add new task to array
    saveTasks()//save updated tasks to local storage
    renderTasks(task)//render new task in the list
    todoInput.value = ""//clear input field
    todoInput.focus();//focus back on input field for better user experience
})       

function renderTasks(task) {
    const li = document.createElement("li")
    li.setAttribute("data-id", task.id)
    if (task.completed) li.classList.add("completed");
    li.innerHTML= `
    <span>${task.text}</span>
    <button class="delete-btn">delete</button>
    `
    ///edit button baad mei 


//  <button class="edit-btn">Edit</button> 
    // `
    // li.querySelector(".edit-btn").addEventListener("click", (e) => {
    //     e.stopPropagation()//prevent click event from bubbling up to li
    //     const newText = prompt("Edit task:", task.text)//prompt user for new task text
    //     if (newText && newText.trim() !== "") {
    //         task.text = newText.trim()//update task text
    //         saveTasks()//save updated tasks to local storage
    //         li.querySelector("span").textContent = task.text//update task text in DOM
    //     }
    // })

    
    li.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON") return;//ignore click on delete button
        task.completed = !task.completed//toggle completed status
        saveTasks()//save updated tasks to local storage
        li.classList.toggle("completed")//toggle completed class for styling
    })

//Learn this again, this is how you can prevent event bubbling in JavaScript. When you click the delete button, it will trigger the click event on the list item (li) as well. By using e.stopPropagation(), we can prevent the click event from bubbling up to the li element, allowing us to handle the delete action without triggering the toggle completed status.

    li.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation()//prevent click event from bubbling up to li
        tasks = tasks.filter(t => t.id !== task.id)//remove task from array
        saveTasks()//save updated tasks to local storage
        li.remove()//remove list item from DOM
    })
    taskList.appendChild(li)

    
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)) //save tasks to local storage
}


//Clear All Tasks
const clearAllButton = document.getElementById("clearAllButton")
clearAllButton.addEventListener("click", () => {
    tasks = []//clear tasks array
    saveTasks()//save empty array to local storage
    taskList.innerHTML = ""//clear task list in DOM
})