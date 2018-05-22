import React, {Component} from 'react';
import './SiderDemo.css'
import { Layout } from 'antd';
import ContentBox from '../Content';
import ManageSee from '../../view/ManageSee';
import RouteInfo from '../RouteInfo';
import { connect } from 'react-redux';
import axios from 'axios';

const { Header, Content } = Layout;

class SiderDemo extends Component {
  constructor (props) {
      super(props)
      this.state = {
        collapsed: false,
        active: 'none',
        username: '请登陆'
      }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  // 切换用户
  toUser () {
    this.setState({
      active: this.state.active=='block'?'none':'block'
    })
  }
  toLogin () {
    axios.post('/promo/manage/workorder/logout')
    .then(res => {
      this.props.history.push('/login')
    })
  }
  componentDidMount () {
    if (window.localStorage.username) {
      this.setState({
        username: window.localStorage.username
      })
    }
  }
  render() {    
    const {routes} = this.props;
    let { active, username } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Header style={{ 
              height: '50px', 
              background: "#000", 
              color: '#fff',
              lineHeight: '50px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <span style={{color: '#fff'}}>工单管理</span>
            <div className="username">
                <span onClick={this.toUser.bind(this)} style={{color: '#fff',cursor: 'pointer'}}>{username}</span>
                <p style={{display: active}} onClick={this.toLogin.bind(this)}>退出登陆</p>
            </div>
          </Header>
          <Content style={{
            padding: 20,
            background: '#fff'
          }}>
              <RouteInfo routes={routes}></RouteInfo>
          </Content>
        </Layout>
      </Layout>
      
    );
  }
}

let mapStateToProps = (state) => {
  console.log(state)
  return {

  }
}
export default connect(mapStateToProps)(SiderDemo)