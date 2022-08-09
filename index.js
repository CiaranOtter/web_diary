import {Checklist, checklist_item} from "./components/checklist.js"
const homeDir = "http://127.0.0.1:5500/"
const checklist = new Checklist()

let activeDay = new Date(Date.now())

document.body.onload = () => {
    console.log("hello wolrd!")

    checklist.fetchJsonData(`${homeDir}backend/getChecklist.php`)
}

function fetch_checklist() {
    let url = `${homeDir}backend/getChecklist.php`; 
    fetch(url)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        checklist.setJsondata(data);
        checklist.loaditemsfromArray();
    })
}
