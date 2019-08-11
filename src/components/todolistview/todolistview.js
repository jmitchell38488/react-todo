import {observer} from "mobx-react";
import React from "react";
import TodoItem from "../todoitem";

const TodoListView = observer(class TodoListView extends React.Component {

    handleToggleAll = (event) => {
        this.props.store.toggleTodos(event.target.checked);
    };

    render() {
        let todoItems = null;
        const activeCount = this.props.store.todoList.filter(e => !e.completed).length;

        if (this.props.store.todoList.length > 0) {
            todoItems = this.props.store.todoList.map(todo => {
                let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                return <TodoItem key={id} todo={todo}/>
            });
        }

        return (
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox" onChange={this.handleToggleAll} checked={activeCount === 0} />
                <label htmlFor="toggle-all"/>
                <ul className="todo-list">
                    {todoItems}
                </ul>
            </section>
        );
    }

});

export default TodoListView;