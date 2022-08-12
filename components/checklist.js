import {homeDir} from "../index.js";
export class checklist_item {
    constructor(json_item) {
        // setting the name of an item using a the json item
        this.item_name = json_item['name'];

        // setting the date created of this item using the json data
        this.item_dateCreated = new Date(json_item['created_date']);

        // setting the due date using the json data
        if (json_item['due_date'] != null){
            this.item_due = new Date(json_item['due_date']);
        } else {
            this.item_due = null;
        }

        //settting the completion date using json data
        if (json_item['completed_date'] != null) {
            this.item_completion_date = new Date(json_item['completed_date']);
        } else {
            this.item_completion_date = null;
        }
        // setting the boolean value for completion

        this.item_completed = !!json_item['complete'];
    }

    getName() {
        return this.item_name;
    }

    getDue_Date() {
        return this.item_due;
    }

    getcreatedMonth() {
        return this.item_dateCreated.getMonth();
    }

    getcreatedYear() {
        return this.item_dateCreated.getFullYear();
    }

    getcreatedDay() {
        return this.item_dateCreated.getDate();
    }

    logItem() {
        console.group("item");
        console.log("item name: "+ this.item_name);
        console.log("date created: "+ this.item_dateCreated);
        console.log("due date for item: "+this.item_due);
        console.log("item complete: "+this.item_completed);
        console.log("item completion date: "+this.item_completion_date);
        console.groupEnd();
    }

    pushToDB() {
        console.log(this.getName())
        let url = homeDir+`backend/addChecklistItem.php?name=${this.getName()}&&due_date=${new Date(this.getDue_Date()).getFullYear()}/${new Date(this.getDue_Date()).getMonth()}/${new Date(this.getDue_Date()).getDate()}`;
        console.log(url);
        fetch(homeDir+`backend/addChecklistItem.php?name=${this.name}&&due_date=${new Date(this.due_date).getFullYear()}/${new Date(this.due_date).getMonth()}/${new Date(this.due_date).getDate()}`)
        .then(data => data.text())
        .then(data => {
            console.log(data);
        });
    }
}

export class Checklist {
    constructor() {
        this.items = [];
        this.jsonData;
    }

    fetchJsonData(url) {
        fetch(url)
        .then(data => data.json())
        .then(jsonArray => {
            console.log("json array results are: ", jsonArray)
            this.setJsondata(jsonArray)
            this.loaditemsfromArray();
        })
    }

    setJsondata(jsonArray) {
        this.jsonData = jsonArray;
        console.log("json data has been set to ")
    }

    loaditemsfromArray() {
        this.jsonData.forEach(item => {
            this.addItem(item);
        })
    }

    addItem(jsonItem) {
        let newItem = new checklist_item(jsonItem);
        this.items.push(newItem);
        newItem.logItem();
        return newItem;
    }
}

