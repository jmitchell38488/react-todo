const API_URL = 'http://localhost:8000/';

export default class Model {

    constructor() {
        this.onChanges = [];
        this.todos = [];
    }

    subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    inform() {
        this.onChanges.forEach(cb => cb());
    }

    async toggleAll(state) {
        const promises = this.todos.map(async todo => {
            const response = await fetch(API_URL + 'item/' + todo.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({
                    title: todo.title,
                    completed: state
                })
            });

            const rItem = await response.json();
            if (rItem.status !== 200) {
                console.error(rItem);
                throw new Error('Could not store todo item');
            }

            return rItem.data;
        });

        this.todos = await Promise.all(promises);
        this.inform();
    }

    async toggle(item) {
        const promises = this.todos.map(async todo => {
            if (todo !== item) {
                return todo;
            }

            const response = await fetch(API_URL + 'item/' + todo.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({
                    title: todo.title,
                    completed: !todo.completed
                })
            });

            const rItem = await response.json();
            if (rItem.status !== 200) {
                console.error(rItem);
                throw new Error('Could not store todo item');
            }

            todo.completed = !todo.completed;
            return todo;
        });

        this.todos = await Promise.all(promises);
        this.inform();
    }

    async add(title) {
        let item = {
            title: title,
            completed: false
        };

        const response = await fetch(API_URL + 'item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(item)
        });

        const rItem = await response.json();

        if (rItem.status !== 200) {
            console.error(rItem);
            throw new Error('Could not store todo item');
        }

        this.todos.push(rItem.data);
        this.inform();
    }

    async save(item, text) {
        const promises = this.todos.map(async todo => {
            if (todo !== item) {
                return todo;
            }

            const response = await fetch(API_URL + 'item/' + todo.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({
                    title: text,
                    completed: todo.completed
                })
            });

            const rItem = await response.json();
            if (rItem.status !== 200) {
                console.error(rItem);
                throw new Error('Could not store todo item');
            }

            return rItem.data;
        });

        this.todos = await Promise.all(promises);
        this.inform();
    }

    async destroy(item) {
        const todo = this.todos.find(e => e.id === item.id);
        if (!todo || todo === void 0) {
            console.error(item);
            throw new Error('Could not delete todo item');
        }

        const response = await fetch(API_URL + 'item/' + todo.id, {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        });

        const rItem = await response.json();
        if (rItem.status !== 200) {
            console.error(rItem);
            throw new Error('Could not delete todo item');
        }

        await this.loadAll();
        this.inform();
    }

    async loadAll() {
        const response = await fetch(API_URL + 'items', {
            method: 'GET',
            mode: 'cors'
        });

        const rItem = await response.json();

        if (rItem.status !== 200) {
            console.error(rItem);
            throw new Error('Could not fetch todo items');
        }

        this.todos = rItem.list;
    }

    async clearCompleted() {
        const nTodos = this.todos.filter(todo => !todo.completed);
        const promises = [];
        this.todos.forEach(async todo => {
            // Skip active todos
            if (!todo.completed) {
                return true;
            }

            const response = await fetch(API_URL + 'item/' + todo.id, {
                method: 'DELETE',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
            });

            promises.push(response);

            const rItem = await response.json();
            if (rItem.status !== 200) {
                console.error(rItem);
                throw new Error('Could not delete todo item');
            }
        });

        await Promise.all(promises);
        this.todos = nTodos;
        this.inform();
    }

}