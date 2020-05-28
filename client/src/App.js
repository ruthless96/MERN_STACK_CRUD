import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './show/header/header';
import Footer from './show/footer/footer';
import BoardEdit from './component/BoardDetail'
import Home from './show/home';
import Login from './component/login'
import UserInfo from './component/userinfo'
import SignUp from './component/signup'
import BoardList from './component/list'
import CreateBoard from './component/create'
import UpdateBoard from './component/update'


class App extends Component {


  render() {
    return (
      <Router>
        <div>
          <Header />

          
          <Route path="/todo/add" component={CreateBoard} />
          <Route path="/todo/list" component={BoardList} />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/userinfo" component={UserInfo} />
          <Route path="/signup" component={SignUp} />
          <Route path="/todo/detail/:id" component={BoardEdit} />
          <Route path="/todo/update/:id" component={UpdateBoard} />

          <Footer />
        </div>
      </Router>
    )
  }
};

export default App;