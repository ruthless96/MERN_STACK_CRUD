import React, { Component } from 'react';
import axios from 'axios'

import { getFromStorage } from '../storage/storage'

class BoardList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            UserName: '',
            UserId: '',
            BoardTitle: '',
            BoardContent: '',
        }

        this.onTextBoardTitle = this.onTextBoardTitle.bind(this);
        this.onTextBoardContent = this.onTextBoardContent.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onTextBoardTitle(event) {
        this.setState({
            BoardTitle: event.target.value
        })
    }

    onTextBoardContent(event) {
        this.setState({
            BoardContent: event.target.value
        })
    }

    home = () => {
        this.props.history.push('/');
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            BoardTitle: this.state.BoardTitle,
            BoardContent: this.state.BoardContent,
            UserName: this.state.UserName,
            UserId: this.state.UserId,
        }

        axios.post('http://localhost:4000/api/todo/add', obj)
            .then(res => {
                if(res.data.success) {
                    this.home()
                } else {
                    alert('글작성에 실패하였습니다.')
                }
            })

        this.setState({
            BoardTitle: '',
            BoardContent: '',
        })
    }

    componentDidMount() {
        const log = getFromStorage('the_main_app');
        const { token } = JSON.parse(log);

        if (token) {

            axios.get('http://localhost:4000/api/userfind?token=' + token, {})
                .then(res => {
                    this.setState({
                        UserName: res.data.UserName,
                        UserId: res.data.UserId,
                    })
                })
        }
    }

    render() {

        const {
            UserName,
            BoardTitle,
            BoardContent,
        } = this.state;

        return (
            <div className="container">
                <h3>Todo Create</h3>
                <form onSubmit={this.onSubmit}>
                    <table className="table my-3">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td><input type="text" value={BoardTitle} onChange={this.onTextBoardTitle} /></td>
                            </tr>
                            <tr>
                                <th>Content</th>
                                <td><input type="text" value={BoardContent} onChange={this.onTextBoardContent} /></td>
                            </tr>
                            <tr>
                                <th>UserName</th>
                                <td value={UserName}>{UserName}</td>
                            </tr>
                            <tr>
                                <td className="text-right" colSpan="2">
                                    <button type="submit" className="btn btn-primary mr-3">작성</button>
                                    <button className="btn btn-primary" onClick={this.home}>취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }

}

export default BoardList;