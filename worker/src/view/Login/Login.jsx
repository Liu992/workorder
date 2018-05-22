import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import { connect } from 'react-redux';
import userAction from '../../store/action/user.js';

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.changeUser = this.changeUser.bind(this)
    this.changePass = this.changePass.bind(this)
  }
  toPage () {
    let { username, password } = this.state;
    axios.post('/promo/manage/workorder/login', {
      "username": username,
      "password": password
    })
    .then((res) => {
      this.props.dispatch(userAction(res.data.nickname))
      if (res.data.success) {
        window.localStorage.username = res.data.nickname
        this.props.history.push('/manage/all')
      } else {
        alert('用户名或者密码错误')
      }
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      username: '',
      password: ''
    })
  }
  changeUser (e) {
    this.setState({
      username: e.target.value
    })
  }
  changePass(e){
    this.setState({
      password: e.target.value
    })
  }
  render() {
    let { username, password } = this.state;
    return (
      <div className="login">
        <div className="login-box">
          <h1>登陆页</h1>
          <p>用户：<input type="text" placeholder="请输入用户名或者账号" onChange={this.changeUser} value={username}/></p>
          <p>密码：<input type="password" placeholder="请输入密码" onChange={this.changePass} value={password}/></p>
          <div className="login-btn">
            <button onClick={this.toPage.bind(this)}>登陆</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Login)