import React, { Component } from 'react';
import axios from 'axios';

// import { BrowserRouter as Link } from 'react-router-dom';

import {
    setInStorage
} from '../storage/storage'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signInId: '',
            signInPw: ''
        };

        this.onTextChangeSignInId = this.onTextChangeSignInId.bind(this);
        this.onTextChangeSignInPw = this.onTextChangeSignInPw.bind(this);

        this.onSignIn = this.onSignIn.bind(this);
    }

    onTextChangeSignInId(event) {
        this.setState({
            signInId: event.target.value
        })
    }

    onTextChangeSignInPw(event) {
        this.setState({
            signInPw: event.target.value
        })
    }

    onSignIn() {
        // Grab state
        const {
            signInId,
            signInPw
        } = this.state;

        // Post request to backend
        axios.post('http://localhost:4000/api/signin', {
            params: {
                UserId: signInId,
                UserPw: signInPw
            },
        }).then(json => {
                if(json.data.success) {
                    setInStorage('the_main_app', { token: json.data.token });
                    this.setState({
                      signInId: '',
                      signInPw: '',
                      token: json.data.token
                    });
                  } else {
                    console.log('ERROR!!!!')
                  }
            })

           this.refresh()
    }

    refresh = () => {
        // window.location.href= '/'
        this.props.history.push('/')
        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

    go = () => {
        this.props.history.goBack();
    }

    render() {

        const {
            signInId,
            signInPw,
            token
        } = this.state;
        if(!token){
        return (
            <main className="container">
                <h2>로그인을 해주세요.</h2>
                <form>
                    <div className="form-group">
                        <label>ID : </label>
                        <input type="text" className="form-control"
                            placeholder="ID를 입력해주세요."
                            value={signInId} onChange={this.onTextChangeSignInId} />
                    </div>
                    <div className="form-group">
                        <label>Passowrd : </label>
                        <input type="password" className="form-control"
                            placeholder="비밀번호를 입력해주세요."
                            value={signInPw} onChange={this.onTextChangeSignInPw} />
                    </div>
                </form>

                <button className="btn btn-primary btn-block mr-5" onClick={this.onSignIn}>로그인</button>
                <button className="btn btn-primary btn-block mr-5" onClick={this.go}>취소</button>
                
            </main>
        )
    }
    }

};

export default Login;