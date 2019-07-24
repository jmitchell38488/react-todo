import React from 'react';
import ReactDOM from 'react-dom';
import { Todo } from './components';
import Model from './model';

// ========================================

const model = new Model();

let render = () => {
    ReactDOM.render(
        <Todo model={model} />,
        document.getElementById('root')
    );
};

model
    .loadAll()
    .then(() => {
        model.subscribe(render);
        render();
    });