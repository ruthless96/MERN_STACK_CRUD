import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Todo = props => (
    <tr>
        <td>{props.todo.BoardNo}</td>
        <td>
            <Link to={"/todo/detail/" + props.todo._id}>{props.todo.BoardTitle}</Link>
        </td>
        <td>{props.todo.UserName}</td>
        <td>{props.todo.Regdate}</td>
    </tr>
)
class BoardList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }
    }

    componentDidMount() {        
        axios.get('http://localhost:4000/api/todo/list')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {

        return (
            <div className="container">
                    <h3>Todos List</h3>
                    <table className="table table-striped my-3">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Title</th>
                                <th>UserName</th>
                                <th>REGDATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.todoList()}
                        </tbody>
                    </table>
                </div>
        )
    }

}

export default BoardList;