const API_URL = 'http://localhost:8000/';

export default class Model {

    async toggleAll(todos, state) {
        const promises = todos.map(async todo => {
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

        return await Promise.all(promises);
    }

    async toggle(todo) {
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
    }

    async add(todo) {
        let item = {
            title: todo.task,
            completed: todo.completed
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

        return rItem.data
    }

    async save(todo) {
        let item = {
            title: todo.task,
            completed: todo.completed
        };

        const response = await fetch(API_URL + 'item/' + todo.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(item)
        });

        const rItem = await response.json();
        if (rItem.status !== 200) {
            console.error(rItem);
            throw new Error('Could not store todo item');
        }

        return rItem.data;
    }

    async destroy(todo) {
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

        return todo;
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

        return rItem.list;
    }

    async clearCompleted(todos) {
        const promises = [];
        todos.forEach(async todo => {
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

        return await Promise.all(promises);
    }

}