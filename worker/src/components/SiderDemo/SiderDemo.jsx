import React, {Component} from 'react';
import './SiderDemo.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ContentBox from '../Content'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends Component {
  constructor (props) {
      super(props)
      this.state = {
        collapsed: false,
      }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{
              background: "#f5f5f5"
          }}
        >
          <div className="logo">
            {/* <input type="text"/> */}
          </div>
          <Menu theme="#f5f5f5" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><span>工单系统后台</span></span>}
            >
              <Menu.Item key="1">处理</Menu.Item>
              <Menu.Item key="2">查看</Menu.Item>
              <Menu.Item key="3">已回复未解决（查看）</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ 
              background: '#fff', 
              height: '50px', 
              background: "#000", 
              color: '#fff',
              lineHeight: '50px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <span style={{color: '#fff'}}>工单管理</span>
            <div className="username">
                <span style={{color: '#fff'}}>张三</span>
            </div>
          </Header>
          <Content >
            {/* <ContentBox/> */}
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo