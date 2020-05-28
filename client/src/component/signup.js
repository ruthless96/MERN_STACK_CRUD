import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            SignUpId: '',
            SignUpPw: '',
            SignUpName: '',
        }

        this.onTextSignUpId = this.onTextSignUpId.bind(this);
        this.onTextSignUpPw = this.onTextSignUpPw.bind(this);
        this.onTextSignUpName = this.onTextSignUpName.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onTextSignUpId(event) {
        this.setState({
            SignUpId: event.target.value
        })
    }

    onTextSignUpPw(event) {
        this.setState({
            SignUpPw: event.target.value
        })
    }

    onTextSignUpName(event) {
        this.setState({
            SignUpName: event.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        // const obj = {
        //     SignUpId: this.state.SignUpId,
        //     SignUpPw: this.state.SignUpPw,
        //     SignUpName: this.state.SignUpName,
        // };

        const {
            SignUpId,
            SignUpPw,
            SignUpName
        } = this.state

        axios.post('http://localhost:4000/api/signup', {
            params: {
                UserId: SignUpId,
                UserPw: SignUpPw,
                UserName: SignUpName
            }
        }).then(res => {
                if(res.data.success) {
                    this.setState({
                        UserId: SignUpId,
                        UserPw: SignUpPw,
                        UserName: SignUpName
                    })

                    setTimeout(() => {
                        window.location.reload()
                    }, 100);

                    this.go();
                }
            })
    }

    go = () => {
        this.props.history.push('/')
    }


    render() {

        const {
            SignUpId,
            SignUpPw,
            SignUpName,
        } = this.state;

        return(
            <div className="container my-5">
                <h2 className="mb-4">회원가입</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" 
                                value={SignUpId} placeholder="아이디를 입력해주세요." 
                                onChange={this.onTextSignUpId}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" 
                                value={SignUpPw} placeholder="비밀번호를 입력해주세요."
                                onChange={this.onTextSignUpPw}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" 
                                value={SignUpName} placeholder="이름을 입력해주세요."
                                onChange={this.onTextSignUpName}/>
                    </div>
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary mr-3">회원가입</button>
                        <button className="btn btn-primary" onClick={this.go}>취소</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;