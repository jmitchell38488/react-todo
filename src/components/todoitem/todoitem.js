import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import {ESCAPE_KEY, ENTER_KEY} from '../../utils';

import './todoitem.css';

const TodoItem = observer(class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editText: props.todo.task
        };

        this.props.todo.autoSave = true;
    }

    componentDidUpdate = (prevProps) => {
        if (!prevProps && this.state.editing) {
            let node = React.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    };

    handleOnToggle = () => {
        this.props.todo.toggle();
    };

    handleOnDoubleClick = () => {
        this.setState((prevState, props) => (
            {editText: props.todo.task, editing: true}
        ));
    };

    handleOnDestroyClick = () => {
        this.props.todo.remove();
    };

    handleOnSubmitChanges = () => {
        this.props.todo.task = this.state.editText;
        this.props.todo.dispose();
        this.setState(() => (
            {editText: this.props.todo.task, editing: false}
        ));
    };

    handleOnTextChange = (event) => {
        if (this.state.editing) {
            let value = event.target.value;
            this.setState(() => (
                {editText: value}
            ));
        }
    };

    handleOnTextKeyDown = (event) => {
        if (event.which === ESCAPE_KEY) {
            this.setState((prevState, props) => ({editText: this.props.todo.task, editing: false}));
        } else if (event.which === ENTER_KEY) {
            this.handleOnSubmitChanges(event);
        }
    };

    render() {
        return (
            <li className={classNames({
                completed: this.props.todo.completed,
                editing: this.state.editing
            })}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.handleOnToggle} />
                    <label onDoubleClick={this.handleOnDoubleClick}>{this.props.todo.task}</label>
                    <button className="destroy" onClick={this.handleOnDestroyClick} />
                </div>
                <input ref="editField" className="edit" value={this.state.editText} onBlur={this.handleOnSubmitChanges} onChange={this.handleOnTextChange} onKeyDown={this.handleOnTextKeyDown} />
            </li>
        )
    }
});

export default TodoItem;