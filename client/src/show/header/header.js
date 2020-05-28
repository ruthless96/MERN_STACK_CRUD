import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { getFromStorage } from '../../storage/storage';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            UserName: '',
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        const log = getFromStorage('the_main_app');
        const {token} = JSON.parse(log)
        // console.log(token)
        this.setState({
            token: token
        })

        axios.get('http://localhost:4000/api/logout?token=' + token, {
            UserId: token
        }).then(res => {
            if(res.data.success) {
                this.setState({
                    token: ''
                });
            } else {
                console.log(token, " : token Error")
            }
        })
        window.location.href="/"
    }

    refresh = () => {
        this.props.history.push('/')
    }

    componentDidMount() {
        
        const log = getFromStorage('the_main_app');
        const {token} = JSON.parse(log)

        if(token) {
            axios.get('http://localhost:4000/api/verify?token=' + token, {})
                .then(res => {
                    if(res.data.success) {
                        this.setState({
                            token,
                            UserName: res.data.message,
                        })
                    }
                })
        }
      }

    render() {

        const {
            token,
            UserName
        } = this.state;

        if(!token) {
        return(
                    <div className='container'>
                        <nav className="navbar navbar-expand-sm bg-light">
                            <Link to="/">Home</Link>
                            <span></span>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/todo/list" className="nav-link">리스트</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/todo/add" className="nav-link">글작성</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">로그인</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">회원가입</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    
        )
    }
    return (
                    <div className='container'>
                        <nav className="navbar navbar-expand-sm bg-light">
                            <Link to="/">Home</Link>
                            <span></span>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/todo/list" className="nav-link">리스트</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/todo/add" className="nav-link">글작성</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item nav-link">
                                    {UserName}
                                </li>
                                <li className="nav-item">
                                    <Link to="/userinfo" className="nav-link">회원정보수정</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={this.logout}>로그아웃</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    
    )

    }
}

export default Header;