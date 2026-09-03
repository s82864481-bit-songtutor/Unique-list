<script>
  let tasks = JSON.parse(localStorage.getItem("saniaTasks")) || [];
  
  // Page load hote hi tasks show karo
  window.onload = function() {
    displayTasks();
  }

  function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if(taskText === "") return;

    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();
    input.value = "";
  }
  
  function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      if(task.completed) taskDiv.classList.add("completed");
      
      taskDiv.innerHTML = `
        <span onclick="toggleComplete(${task.id})">${task.text}</span>
        <button class="delete" onclick="deleteTask(${task.id})">X</button>
      `;
      
      taskList.appendChild(taskDiv);
    });
  }
  
  function toggleComplete(id) {
    tasks = tasks.map(task => {
      if(task.id === id) task.completed = !task.completed;
      return task;
    });
    saveTasks();
    displayTasks();
  }
  
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
  }
  
  function saveTasks() {
    localStorage.setItem("saniaTasks", JSON.stringify(tasks));
  }
  
  // Enter dabane se bhi add ho jaye
  document.getElementById("taskInput").addEventListener("keypress", function(e){
    if(e.key === "Enter") addTask();
  });
</script>
