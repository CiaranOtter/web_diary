// import the checklist from the components file
import {Checklist, checklist_item} from "./components/checklist.js"
//make the know directory of the backend available to the whole project
export const homeDir = "https://sudocode.co.za/Web-diary/backend"
// create a new instance of the checklist
const checklist = new Checklist(document.getElementById("checklist_parent"));

// setting the active day of the diary to today
let activeDay = new Date();
let activeDayPicker = document.getElementById("active_day");
setFormattedDate(activeDay, activeDayPicker);
activeDayPicker.addEventListener("input", (e) => {
    activeDay = new Date(activeDayPicker.value); 
    console.log(e)
    console.log(activeDay);
    checklist.getItemsByDate(activeDay);
})
checklist.getItemsByDate(activeDay);

document.getElementById("save_new_checklist_item").addEventListener("click", saveNewChecklistItem);

function setFormattedDate(date, object) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let formdate = "";
    if (month <= 9) {
        formdate = `${year}-0${month}-${day}`;
    } else {
        formdate = `${year}-${month}-${day}`;
    }

    object.value = formdate;

    return formdate;
}

// this function is called when the save new item button is pressed
// it retrieves the values from the inputs and creates a json array that it can pass to the 
function saveNewChecklistItem() {
    console.log("the button has been pressed and will now attempt to createa and save a new checklist item")

    let name = document.getElementById("new_checklist_item_name").value;
    let dueDate = document.getElementById("new_check_item_due_date").value;

    if (name == "") {
        console.log("the name of the checklist item can not have a null name");
        return;
    }

    let createdDate = new Date();
    dueDate = new Date(dueDate)

    let jsonArray = {
        "name": name,
        "due_date": dueDate,
        "created_date": createdDate,
        "completed": false,
        "completed_date": null
    };

    let item = checklist.addItem(jsonArray);
    item.pushToDB();
    checklist.getItemsByDate(activeDay);
}

document.body.onload = () => {
    checklist.fetchJsonData(`${homeDir}/getChecklist.php`)
}
