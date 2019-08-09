import {observable, computed, action, decorate} from 'mobx';
import { fromPromise } from 'mobx-utils';
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
        nowShowing: ALL_TODOS,
        editing: null,
        newTodo: ''
    };

    constructor(fetch, model) {
        this.fetch = fetch;
        this.model = model;
        this.loadTodos();
    }

    loadTodos() {
        this.isLoading = true;
        setTimeout(() => {
            const todo = new Todo(this);
            todo.task = 'Buy milk';
            this.todos.push(todo);
            this.isLoading = false;
        }, 1500);
    }

    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        todo.dispose();
    }

    addTodo(task) {
        const todo = new Todo(this);
        todo.task = task;
        this.todos.push(todo);
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
        if (this.currentView.nowShowing === ALL_TODOS) {
            return this.todos;
        }

        return this.todos.filter(e => this.currentView.nowShowing === ALL_TODOS && e.completed);
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
    showAllTodos() {
        this.currentView = {
            nowShowing: ALL_TODOS,
            editing: null,
            newTodo: ''
        };
    }

    //@action
    showActiveTodos() {
        this.currentView = {
            nowShowing: ACTIVE_TODOS,
            editing: null,
            newTodo: ''
        };
    }

    //@action
    showCompletedTodos() {
        this.currentView = {
            nowShowing: COMPLETED_TODOS,
            editing: null,
            newTodo: ''
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
    showAllTodos: action,
    showActiveTodos: action,
    showCompletedTodos: action
});

export default TodoStore;