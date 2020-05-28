import React, { Component } from 'react';
import axios from 'axios'

import { getFromStorage } from '../storage/storage'

class UserInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            UserId: '',
            UserName: '',
            UserPw: '',
        }

        this.onTextUserPw = this.onTextUserPw.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    home = () => {
        this.props.history.push('/');
    }

    onTextUserPw(event) {
        this.setState({
            UserPw: event.target.value
        })
    }

    onSubmit(e) {

        e.preventDefault();

        const obj = {
            UserId: this.state.UserId,
            UserPw: this.state.UserPw,
        }

        const log = getFromStorage('the_main_app');
        const {token} = JSON.parse(log);

        axios.post('http://localhost:4000/api/userupdate?token=' + token, {
            params: obj
        }).then(res => console.log(res))
    }

    componentDidMount() {
        
        const log = getFromStorage('the_main_app');
        const {token} = JSON.parse(log);

        if(token) {
            
            axios.get('http://localhost:4000/api/userfind?token=' + token, {})
                .then(res => {
                    this.setState({
                        UserId: res.data.UserId,
                        UserName: res.data.UserName,
                    })
                })
        }
      }

    render() {

        const {
            UserId,
            UserName,
            UserPw,
        } = this.state;

        return (
            <div className="container my-5">
                <h3 className="text-left">회원 정보 수정</h3>
                <form onSubmit={this.onSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>{UserId}</th>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <th><input type="password" className="form-control" 
                                    value={UserPw} onChange={this.onTextUserPw}/></th>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <th>{UserName}</th>
                            </tr>
                            <tr><th></th><th></th></tr>
                        </tbody>
                    </table>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary mr-3">수정</button>
                        <button className="btn btn-primary" onClick={this.home}>취소</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default UserInfo;