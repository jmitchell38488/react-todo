import React from 'react';
import { observer } from 'mobx-react';
import './todolist.css';
import TodoListView from '../todolistview';
import TodoInputField from '../todoinput';
import TodoListFooter from '../todolistfooter';

const TodoList = observer(({store}) => {
    return (
        <div className="todo-container">
            <header className="header">
                <h1>todos</h1>
                <TodoInputField store={store}/>
            </header>
            <TodoListView store={store}/>
            <TodoListFooter store={store}/>
        </div>
    );
});

export default TodoList;