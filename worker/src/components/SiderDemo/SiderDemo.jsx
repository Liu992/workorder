import React, {Component} from 'react';
import './SiderDemo.less'
import { Layout, Menu } from 'antd';
import ContentBox from '../Content';
import { Route, Switch } from 'react-router-dom';
import ManageSee from '../../view/ManageSee';

const { Header, Content } = Layout;

class SiderDemo extends Component {
  constructor (props) {
      super(props)
      this.state = {
        collapsed: false
      }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  
  render() {    
    console.log(this.props.history)
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
                <span style={{color: '#fff'}}>{window.localStorage.username?window.localStorage.username: '登陆'}</span>
            </div>
          </Header>
          <Content style={{
            padding: 20,
            background: '#fff'
          }}>
            <Switch>
              <Route path="/manage/all" component={ManageSee}></Route>
              <Route path="/manage/handle" component={ContentBox}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo