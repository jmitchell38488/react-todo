import {observable, computed, action, decorate} from 'mobx';
import Todo from './model/todo';

export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

class TodoStore {

    fetch = null;
    model = null;

    //@observable
    isLoading = true;

    //@observable
    todos = [];

    //@observable
    currentView = {
        nowShowing: ALL_TODOS
    };

    constructor(fetch, model) {
        this.fetch = fetch;
        this.model = model;
        this.loadTodos();
    }

    loadTodos() {
        this.isLoading = true;
        this.model.loadAll()
            .then(todos => {
                todos.forEach(todo => {
                    const item = new Todo(this);
                    item.updateFromJson(todo);
                    item.id = todo.id;
                    this.todos.push(item);
                });
                this.isLoading = false;
            })
            .catch(e => {
                console.error(e);
                this.isLoading = false;
            });
    }

    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.model.destroy(todo);
    }

    addTodo(task) {
        const todo = new Todo(this);
        todo.task = task;
        this.model.add(todo)
            .then((t) => {
                todo.updateFromJson(t);
                todo.id = t.id;
                this.todos.push(todo);
            });
    }

    //@computed
    get currentPath() {
        switch (this.currentView.nowShowing) {
            case ALL_TODOS:
            default:
                return '/';
            case ACTIVE_TODOS: return '/active';
            case COMPLETED_TODOS: return '/completed';

        }
    }

    //@computed
    get todoList() {
        if (this.currentView.nowShowing === ACTIVE_TODOS) {
            return this.todos.filter(e => !e.completed);
        }

        if (this.currentView.nowShowing === COMPLETED_TODOS) {
            return this.todos.filter(e => e.completed);
        }

        return this.todos;
    }

    //@computed
    get activeTodos() {
        return this.todos.filter(e => e.completed === false);
    }

    //@computed
    get completedTodos() {
        return this.todos.filter(e => e.completed === true);
    }

    //@action
    toggleTodos(state) {
        this.todoList.forEach(e => e.completed = state);
    }

    //@action
    showAllTodos() {
        this.currentView = {
            nowShowing: ALL_TODOS
        };
    }

    //@action
    showActiveTodos() {
        this.currentView = {
            nowShowing: ACTIVE_TODOS
        };
    }

    //@action
    showCompletedTodos() {
        this.currentView = {
            nowShowing: COMPLETED_TODOS
        };
    }
}

decorate(TodoStore, {
    isLoading: observable,
    todos: observable,
    currentView: observable,
    currentPath: computed,
    todoList: computed,
    activeTodos: computed,
    completedTodos: computed,
    toggleTodos: action,
    showAllTodos: action,
    showActiveTodos: action,
    showCompletedTodos: action
});

export default TodoStore;