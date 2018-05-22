import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

class Login extends Component {
  constructor (props) {
    super(props)
  }
  toPage () {
    let { username, password } = this.refs;
    axios.post('/promo/manage/workorder/login', {
      "username": username.value,
      "password": password.value
    })
    .then((res) => {
      console.log(res)
      if (res.data.success) {
        this.props.history.push('/manage/all')
        window.localStorage.username = res.data.nickname
      } else {
        alert('用户名或者密码错误')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="login">
        <div className="login-box">
          <h1>登陆页</h1>
          <label>用户：<input type="text" placeholder="请输入用户名或者账号" ref="username"/></label>
          <label>密码：<input type="password" placeholder="请输入密码" ref="password"/></label>
          <div className="login-btn">
            <button onClick={this.toPage.bind(this)}>登陆</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login