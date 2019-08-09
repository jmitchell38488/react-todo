import {observable, reaction, computed, decorate} from 'mobx';
import uuid from 'node-uuid';

class Todo {

    id = null;

    //@observable
    completed = false;

    //@observable
    task = "";

    store = null;

    autoSave = false;
    saveHandler = null;

    constructor(store, id = uuid.v4()) {
        this.store = store;
        this.id = id;

        this.saveHandler = reaction(
            () => this.asJson,
            (json) => {
                console.log(json);
                /*if (this.autoSave) {
                    //this.store.transportLayer.saveTodo(json);
                }*/
            }
        )
    }

    delete() {
        //this.store.transportLayer.deleteTodo(this.id);
        this.store.removeTodo(this);
    }

    //@computed
    get asJson() {
        return {
            id: this.id,
            completed: this.completed,
            task: this.task
        }
    }

    updateFromJson(json) {
        this.task = json.task;
        this.completed = json.completed;
    }

    dispose() {
        this.saveHandler();
    }

}

decorate(Todo, {
    completed: observable,
    task: observable,
    asJson: computed
});

export default Todo;