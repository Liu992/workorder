import React, { Component } from 'react';
import './Table.css';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Select } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import itemworkorder from '../../../store/action/itemworkorder';
import workorderlistActiom from '../../../store/action/workorderlist'
const Option = Select.Option;

let mapStateToProps = (state) => {
  return {
    data: state.Itemworkorder.data
  }
}
@connect(mapStateToProps)
class TableBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      status: {
        1: ['处理', '关闭'], 2: ['查看', '关闭'], 3: ['查看'], 4: ['查看','更改状态'], 9: []
      },
      txt: '',
      value: ''
    }
    this.changePag = this.changePag.bind(this)
    this.closeOrder = this.closeOrder.bind(this)
  }
  onStatus (txt, status,id) {
    this.props.dispatch(itemworkorder({
      id,
      status,
      txt
    }))
    switch (txt) {
      case '处理':
        return this.props.history.push('/manage/handle/'+ id +'', {
             txt,
             status,
             id
           })
        break;
      case '查看':
        return this.props.history.push('/manage/handle/'+ id +'', {
          txt,
          status,
          id
        })
      break;
      case '关闭':
        this.setState({
          txt: '关闭'
        })
        
        return this.showModal()
      break;
      case '更改状态':
        this.setState({
          txt: '更改状态'
        })
        return this.showModal()
        break;
      default:
        break;
    }
  }
  closeOrder () {
    axios.post('/promo/manage/workorder/close', {
      workOrderId: this.props.data.id
    })
    .then(res => {
      this.changePag()
    })
  }
  changePag () {
    axios.post('/promo/manage/workorder/list', {
      pageIndex: this.props.pagenum,
      pageSize: 10
    })
    .then(res => {
      this.props.dispatch(workorderlistActiom(res.data.data.rows))
    })
    .catch(err => {
      console.log(err)
    })
  }
  // 弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 点确认
  handleOk = (e) => {
    if (this.state.txt == '关闭' || this.state.value== '关闭') {
      this.closeOrder()
    } else {
      axios.post('/promo/manage/workorder/resolve', {
        workOrderId: this.props.data.id
      })
      .then(res => {
        console.log(res)
        this.changePag()
      })
      .catch(err => {
        console.log(err)
      })
    }
    this.setState({
      visible: false,
    });
  }
  // 点取消
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 更改状态
  handleChange2(value) {
    this.setState({
      value: value
    })
  }
  render() {
    const { workorderlist } = this.props;
    let { status, txt } = this.state;
    return (
      <div className="table">
        {/* 弹出框 */}
        <div>
          <Modal
            title={txt=='关闭'?"确认关闭此工单":"更改状态"}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            width='320px'
            cancelText="取消"
            okText="确认"
            bodyStyle={{textAlign: 'center'}}
            style={{textAlign:'center'}}
          >
            {
              txt=='关闭'?<p>关闭后，此工单将删除全部信息</p>:<Select defaultValue="已解决" style={{ width: 150 }} onChange={this.handleChange2.bind(this)}>
                <Option value="已解决">已解决</Option>
                <Option value="关闭">关闭</Option>
              </Select>
            }
          </Modal>
        </div>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>工单编号</th>
              <th>用户名</th>
              <th>问题类型</th>
              <th>提交日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              workorderlist!==''&&workorderlist.map((item, ind) => {
                return (
                  <tr key={item.id}>
                    <td>{item.orderCode}</td>
                    <td>{item.account}</td>
                    <td>{item.questionTypeText}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.statusText}</td>
                    <td>
                      {
                        status[item.status].map((item1, ind1) => {
                          return (
                            <span key={ind1} onClick={this.onStatus.bind(this, item1, item.statusText, item.id)}>{item1}</span>
                          )
                        })
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default withRouter(TableBox)