import {homeDir, activeDayPicker} from "../index.js";
export class checklist_item {
    constructor(json_item) {
        // setting the name of an item using a the json item
        this.item_name = json_item['name'];

        this.id = json_item['id'];

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

        this.item_bgColor = json_item['background_color'];
    }

    toggleChecked() {
        console.log("you have click a check box and here is the associated item:");
        this.logItem();

        let checked = document.getElementById(`checklist_item_${this.id}`).checked;

        if (checked) {
            document.getElementById(`cheklist_item_${this.id}_label`).innerHTML = `<strike>${this.item_name}</strike>`;

        } else {
            document.getElementById(`cheklist_item_${this.id}_label`).innerHTML = `${this.item_name}` 
        }

        this.updatechecked(checked);

    }

    updatechecked(value) {
        let url = homeDir + `/updateChecked.php?checked=${value}&&id=${this.id}`;

        fetch(url)
        .then(data => data.text())
        .then(data => {
            console.log(data);
        })
    }

    generateCheckItem(parent) {
        console.log("checklist parent is:", parent, parent.innerhtml)

        let container = document.createElement('div');

        if (this.item_bgColor != null){
            container.style.backgroundColor = this.item_bgColor;
        }
        

        let input = document.createElement("input");
        input.id = `checklist_item_${this.id}`;
        input.type = "checkbox";
        input.onclick = () => {
            console.log("You have clicked an item")
            this.toggleChecked()
        }
        
        let label = document.createElement("label");
        label.for = `checklist_item_${this.id}`;
        label.id = `cheklist_item_${this.id}_label`
        label.innerHTML = this.item_name;

    
        container.appendChild(input);
        container.appendChild(label);

        parent.appendChild(container);
    }

    generateDateItem(parent) {
        console.log("checklist parent is:", parent, parent.innerhtml)

        let container = document.createElement('div');

        if (this.item_bgColor != null){
            container.style.backgroundColor = this.item_bgColor;
        }
        
        let label = document.createElement("div");
        // label.for = `checklist_item_${this.id}`;
        label.id = `due_cheklist_item_${this.id}_label`
        label.innerHTML = this.item_name;

        let date = document.createElement("div");
        date.id = `due_checklist_item_${this.id}_date`;
        if (this.hasDueDate()) {
            date.innerHTML = `${this.getDueDateDay()}-${this.getDueDateMonth()}-${this.getDueDateFullYear()}`;
        } else {
            date.innerHTML = "This item has no due date";
        }
        
        date.classList.add("due_checklist_date")
    
        container.appendChild(label);
        container.appendChild(date);

        parent.appendChild(container);
    }

    getName() {
        return this.item_name;
    }

    hasDueDate() {
        if (this.getDueDate() != null){
            return true;
        } 

        return false;
    }
    getDueDate() {
        return this.item_due;
    }

    getDueDateDay() {
        return this.item_due.getDate();
    }

    getDueDateMonth() {
        return this.item_due.getMonth();
    }

    getDueDateFullYear() {
        return this.item_due.getFullYear();
    }

    getcreatedDate() {
        return this.item_dateCreated;
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
        let url = homeDir+`/addChecklistItem.php?name=${this.getName()}&&due_date=${new Date(this.getDueDateFullYear())}/${this.getDueDateMonth()}/${this.getDueDateDay()}`;
        console.log(url);
        fetch(url)
        .then(data => data.text())
        .then(data => {
            console.log(data);
        });
    }
}

export class Checklist {
    constructor(parent, due_parent) {
        this.items = [];
        this.jsonData;
        this.parent = parent;
        this.due_parent = due_parent;
    }

    getItemsByDate(date) {
        let count = 0;
        this.parent.innerHTML = "";
        console.log(`fetching the checklist items that match the date ${date}`)
        this.items.forEach((item) =>{
            console.log(item.getcreatedDate(), date)
            if ((date.getMonth() == item.getcreatedMonth()) && (date.getDate() == item.getcreatedDay())&&(date.getFullYear() == item.getcreatedYear())){
                console.log("this item has the correct date:")
                item.logItem();
                item.generateCheckItem(this.parent);
                count++;
            }
        });

        if (count == 0) {
            this.parent.innerHTML = "<div style='text-align: center; color: #6A706E'>You have nothing due for today."
        }
    }

    sortItemsByDueDate() {
        this.due_parent.innerHTML = "";
        console.log("fetching checklist items in due date order");
        this.items.sort((a,b) => {
            return a.due_date - b.due_date;
        });
    }

    getItemsByDueDate() {
        this.sortItemsByDueDate();
        
        this.items.forEach(item => {
            console.log("fetching checklist items in due sate order");
            item.logItem();
            item.generateDateItem(this.due_parent);      
        });
    }

    fetchJsonData(url) {
        return (fetch(url)
        .then(data => data.json())
        .then(jsonArray => {
            console.log("json array results are: ", jsonArray)
            this.setJsondata(jsonArray)
            this.loaditemsfromArray();
        }));
    }

    setJsondata(jsonArray) {
        this.jsonData = jsonArray;
        console.log("json data or checklist has been set")
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

