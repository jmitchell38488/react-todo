import {observable, reaction, computed, decorate} from 'mobx';

class Todo {

    id = null;
    created = null;
    updated = null;
    deleted = false;

    //@observable
    completed = false;

    //@observable
    task = "";

    store = null;
    saveHandler = null;
    autoSave = false;

    constructor(store) {
        this.store = store;

        this.saveHandler = reaction(
            () => this.asJson,
            (json) => {
                if (this.autoSave) {
                    if (this.deleted) {
                        this.store.model.destroy(json);
                    } else {
                        this.store.model.save(json);
                    }
                }
            }
        )
    }

    remove() {
        this.deleted = true;
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
        this.autoSave = false;

        this.task = json.task || json.title;
        this.completed = json.completed;
        this.created = json.created || null;
        this.updated = json.updated || null;

        this.autoSave = true;
    }

    toggle() {
        this.completed = !this.completed;
    }

    dispose() {
        this.saveHandler();
    }

}

decorate(Todo, {
    completed: observable,
    task: observable,
    asJson: computed,
});

export default Todo;