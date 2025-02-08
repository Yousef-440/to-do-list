
let ListItem = JSON.parse(localStorage.getItem("tasks")) ?? [];
window.onload = Item;

function Item() {
    const taskItem = document.getElementById("taskList");
    taskItem.innerHTML = "";
    
    ListItem.forEach(function(item , index){
        const element = document.createElement("li");
        if (item.isDone) {
            element.style.background = "linear-gradient(to right, #3e0a3c, #5a1d2b)";
            element.style.border = "2px solid #ff3366";
            element.style.boxShadow = "0 3px 10px rgba(255, 51, 102, 0.8)";
        }
        
        const timeValue = item.time;
        const txt = item.name;
        element.innerHTML =
        `
        <span>${txt}</span>
        <h3>${timeValue}</h3>
        <div>
            <button class="edit" onclick="editItem(${index})"> Edit </button>
            <button onclick="deleteItem(${index})"> Delete </button>
            ${item.isDone ? `
                <button onclick="toggleTask(${index})">cansel</button>
                `
                :
                `
                <button onclick="toggleTask(${index})">Done</button>
                `}
            
        </div>
        `;
        taskItem.appendChild(element);
    });
}

function addTask() {
    const input = document.getElementById("taskInput").value.trim();
    if(input){
        let date = new Date();
        let time = date.getDay() + "/" + (date.getMonth()+1) +" | " + (date.getHours()) + ":" + date.getMinutes();
        ListItem.push({name:input , time:time , isDone:false});
        storage();
        document.getElementById("taskInput").value = "";
        Item();
    }
    
}

function deleteItem(index){
    if(confirm("Are you shure to delete it ?")){
        ListItem.splice(index , 1);
        storage();
        Item();
    }
}

function editItem(index){
    let newTask = prompt("Edit Task: ", ListItem[index].name);
    let date = new Date();
    let time = date.getDay() + "/" + (date.getMonth()+1) +" | " + (date.getHours()) + ":" + date.getMinutes();
    if(newTask){
        ListItem[index].name = newTask;
        ListItem[index].time = time;

        storage();
        Item();
    }
}
function toggleTask(index){
    ListItem[index].isDone = !ListItem[index].isDone;
    storage();
    Item();
    if(ListItem[index].isDone == true)
        alert("Will Done");
}

function storage(){
    localStorage.setItem("tasks", JSON.stringify(ListItem));
}