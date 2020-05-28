import React, { Component } from 'react';
import axios from 'axios';
import { Link, Router } from 'react-router-dom';
import { getFromStorage } from '../storage/storage';

export default class BoardDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            UserId: '',
            UserName: '',
            BoardTitle: '',
            BoardContent: '',
            Regdate: '',
        };

        this.goback = this.goback.bind(this);

    }

    goback = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const log = getFromStorage('the_main_app');
        const { token } = JSON.parse(log);

        if (token) {
            axios.get('http://localhost:4000/api/userfind?token=' + token, {})
                .then(res => {
                    this.setState({
                        UserId: res.data.UserId,
                        UserName: res.data.UserName,
                    })
                })

            axios.get('http://localhost:4000/api/todo/detail/' + this.props.match.params.id, {})
                .then(res => {
                    this.setState({
                        UserId: res.data.UserId,
                        UserName: res.data.UserName,
                        BoardTitle: res.data.BoardTitle,
                        BoardContent: res.data.BoardContent,
                        Regdate: res.data.Regdate,
                    })
                })
        }
    }

    render() {

        const {
            UserName,
            BoardTitle,
            BoardContent,
            Regdate,
        } = this.state;

        return (
            <div className="container">
                <h3>Board Detail</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <tbody>
                        <tr className="text-right">
                            <td colSpan="2">
                                <p className="my-0 text-center">{BoardTitle}</p>
                                작성자 : {UserName}
                                <p className="my-0">{Regdate}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>{BoardContent}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Link to={"/todo/update/"+this.props.match.params.id} className="btn btn-primary mr-3">편집</Link>
                                <Link to={"/todo/list"} className="btn btn-primary">취소</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}