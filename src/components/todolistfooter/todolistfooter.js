import React from 'react';
import {observer} from "mobx-react";
import {Footer} from "../index";

const TodoListFooter = observer(class TodoListFooter extends React.Component {

    handleClearCompleted = (event) => {
        this.props.store.completedTodos.forEach(t => t.remove());
    };

    render() {
        const activeCount = this.props.store.activeTodos.length;
        const completedCount = this.props.store.completedTodos.length;

        return (
            <Footer
                count={activeCount}
                completedCount={completedCount}
                nowShowing={this.props.store.currentView.nowShowing}
                onClearCompleted={this.handleClearCompleted}
            />
        );
    }

});

export default TodoListFooter;