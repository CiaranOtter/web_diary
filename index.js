import {Checklist, checklist_item} from "./components/checklist.js"
export const homeDir = "https://sudocode.co.za/Web-diary/backend"
const checklist = new Checklist()
console.log("the home directory is: ", homeDir)
let activeDay = new Date(Date.now())

document.getElementById("save_new_checklist_item").addEventListener("click", saveNewChecklistItem);

function saveNewChecklistItem() {
    console.log("the button has been pressed and will now attempt to createa and save a new hecklist item")

    let name = document.getElementById("new_checklist_item_name").value;
    let dueDate = document.getElementById("new_check_item_due_date").value;

    if (name == "") {
        console.log("the name of the checklist item can not have a null name");
        return;
    }

    
    let createdDate = new Date();
    dueDate = new Date(dueDate)

    
    console.log(name, dueDate)
    let jsonArray = {
        "name": name,
        "due_date": dueDate,
        "created_date": createdDate,
        "completed": false,
        "completed_date": null
    };

    let item = checklist.addItem(jsonArray);
    item.pushToDB();
}

document.body.onload = () => {
    console.log("hello wolrd!")

    checklist.fetchJsonData(`${homeDir}/getChecklist.php`)
}

function fetch_checklist() {
    let url = `${homeDir}/getChecklist.php`; 
    fetch(url)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        checklist.setJsondata(data);
        checklist.loaditemsfromArray();
    })
}
