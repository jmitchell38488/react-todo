import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../../utils';
import { Footer, Item } from '../index';
import './todolist.css';
import  TodoItem from '../todoitem';

const TodoList = observer(({store}) => {
    return (
        <div className="todo-container">
            <header className="header">
                <h1>todos</h1>
                <TodoInputField store={store}/>
            </header>
            {renderCurrentView(store)}
            {renderFooter(store)}
        </div>
    );
});

const TodoInputField = observer(class NewTodoField extends React.Component {

    state = {
        text: ''
    };

    handleKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const value = this.state.text.trim();
        if (value) {
            this.props.store.addTodo(value);
            this.setState(() => (
                {text: ''}
            ));
        }
    };

    handleOnChange = (event) => {
        const value = event.target.value;
        this.setState(() => (
            {text: value}
        ));
    };

    render() {
        return <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.text}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleOnChange}
            autoFocus={true}
        />;
    }

});

function renderCurrentView(store) {

    //@computed
    let todoItems = null;
    if (store.todoList.length > 0) {
        todoItems = store.todoList.map(todo => {
            let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            return <TodoItem key={id} todo={todo}/>
        });
    }

    return (
        <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox"/>
            <label htmlFor="toggle-all"/>
            <ul className="todo-list">
                {todoItems}
            </ul>
        </section>
    );
}

function renderFooter(store) {
    const activeCount = store.activeTodos.length;
    const completedCount = store.completedTodos.length;

    return (
        <React.Fragment>
            <Footer
                count={activeCount}
                completedCount={completedCount}
                nowShowing={store.currentView.nowShowing}
                //onClearCompleted={this.clearCompleted}
            />
        </React.Fragment>
    )
}






class TodoListAAA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowShowing: ALL_TODOS,
            editing: null,
            newTodo: ''
        };
    }

    handleChange = (event) => {
        this.setState({newTodo: event.target.value});
    };

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const val = this.state.newTodo.trim();
        if (val) {
            this.props.model.add(val);
            this.setState({newTodo: ''});
        }
    };

    toggleAll = async (event) => {
        const checked = event.target.checked;
        await this.props.model.toggleAll(checked);
    };

    toggle = async (item) => {
        await this.props.model.toggle(item);
        console.log(this.state);
        console.log(this.props);
    };

    destroy = async (item) => {
        await this.props.model.destroy(item);
    };

    edit = async (item) => {
        this.setState({editing: item.id});
    };

    save = async (item, text) => {
        await this.props.model.save(item, text);
        this.setState({editing: null});
    };

    cancel = () => {
        this.setState({editing: null});
    };

    clearCompleted = async () => {
        await this.props.model.clearCompleted();
    };

    render() {
        return <div><p>Hello!</p></div>


        /*
        let footer, main;
        const todos = this.props.model.todos;
        const showTodos = todos.filter(todo => {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;

                case COMPLETED_TODOS:
                    return todo.completed;

                default:
                    return true;
            }
        });

        const todoItems = showTodos.map(todo => {
            let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;
            return (
                <Item
                    key={id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel}
                />
            );
        });

        const activeCount = todos.filter(e => !e.completed).length;
        const completedCount = todos.length - activeCount;

        if (activeCount || completedCount) {
            footer =
                <Footer
                    count={activeCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />;
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" onChange={this.toggleAll} checked={activeCount === 0} />
                    <label htmlFor="toggle-all"/>
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                        />
                </header>
                {main}
                {footer}
            </div>
        );
        */
    }

}

//export default TodoListAAA;
export default TodoList;