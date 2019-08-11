import {observer} from "mobx-react";
import React from "react";
import {ENTER_KEY} from "../../utils";

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

export default TodoInputField;