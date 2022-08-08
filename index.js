document.body.onload = () => {
    console.log("hello wolrd!")
    fetch_checklist();
    load_checklist(activeDay);
}

const homeDir = "http://127.0.0.1:5500/"

let activeDay = new Date(Date.now())

function load_checklist(date) {
    console.log(date)
    console.log(date.getFullYear()+ "/"+date.getMonth()+"/"+date.getDate())

    // activeChecklist
}

function fetch_checklist() {
    let url = `${homeDir}backend/getChecklist.php`; 
    fetch(url)
    .then(data => data.json())
    .then(data => {
        console.log(data)
    })
}

class checkllist {
    constructor(json_checklist) {
        this.items = [];
    }
}

class checklist_items {
    constructor(json_item) {
        // setting the name of an item using a the json item
        this.item_name = json_item['name'];
        this.item_dateCreated = new Date(json_item['created_date']);
        this.item_created_month = this.item_dateCreated.getMonth();
        this.item_created_year = this.item_dateCreated.getFullYear();
        this.item_created_day = this.item_dateCreated.getDate();


    }
}

