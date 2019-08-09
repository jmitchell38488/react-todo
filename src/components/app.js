import React from 'react';
import { observer } from 'mobx-react';
import TodoList from './todolist';
import Loader from './loader';
import {Footer} from "./index";

export const App = observer(({ store }) => {
    return (
        <React.Fragment>
            { store.isLoading ? <Loader isLoading={store.isLoading} /> : null }
            { store.isLoading ? null : <TodoList store={store} /> }
        </React.Fragment>
    );
});