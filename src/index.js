import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components';
import Model from './model';
import {router, fetch, TodoStore} from './store';

const model = new Model();
const todoStore = new TodoStore(fetch, model);
router(todoStore);

ReactDOM.render(
    <App store={todoStore} />,
    document.getElementById('root')
);