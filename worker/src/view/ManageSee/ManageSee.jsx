import React, { Component } from 'react';
import './ManageSee.css';
import { Input, Button, DatePicker, Select, Pagination } from 'antd';
import TableBox from './Table'
import axios from 'axios';
import unlogin from '../../until/unlogin';
import {connect} from 'react-redux';
import workorderlistActiom from '../../store/action/workorderlist'
const Option = Select.Option;


class ManageSee extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startValue: null, //开始时间
      endValue: null,// 结束时间
      endOpen: false,
      workorderlist: [],// 工单列表
      allLen: 0, // 列表总长度
      pagenum: 1,
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      on: false
    }
    this.reload = this.reload.bind(this)
    this.reload1 = this.reload1.bind(this)
  }
  // 分页
  changePage(pageNumber) {
    this.setState({
      pagenum: pageNumber
    }, () => {
      if (this.state.on) {
        this.reload()
      } else {
        this.reload1()
      }
    })
  }
  // 问题类型
  handleChange1(value) {
    this.setState({
      val3: value
    })
  }
  // 状态
  handleChange2(value) {
    this.setState({
      val4: value
    })
  }
  // 禁用开始时间日期
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }
  // 禁用结束日期时间
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }
  // 开始时间
  onStartChange = (value) => {
    this.onChange('startValue', value);
  }
  // 结束时间
  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  componentDidMount () {
    axios.post('/promo/manage/workorder/list', {
      pageIndex: 1,
      pageSize: 10
    })
    .then(res => {
      if (unlogin(res)) {
        this.props.dispatch(workorderlistActiom(res.data.data.rows))
        this.setState({
          allLen: res.data.data.count
        })
      } else {
        this.props.history.push('/login')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  reload(){
    let { val1, val2, val3, val4, startValue, endValue, on} = this.state;
    axios.post('/promo/manage/workorder/list', {
      "pageIndex":this.state.pagenum,
      "pageSize":10,
      "orderCode": val1, //工单编号
      "account":val2, //用户名
      "questionType": val3, //问题类型
      "status":val4,  //状态
      "createdAtStart": startValue?(new Date(startValue._d)).toISOString().slice(0,10):'', //提交日期_起始
      "createdAtEnd": endValue?(new Date(endValue._d)).toISOString().slice(0,10):''//提交日期_截止     
    })
    .then(res => {
      this.setState({
        allLen: res.data.data.count
      })
      this.props.dispatch(workorderlistActiom(res.data.data.rows))
    })
    .catch(err => {
      console.log(err)
    })
  }
  reload1(){
    axios.post('/promo/manage/workorder/list', {
      pageIndex: this.state.pageNumber,
      pageSize: 10
    })
    .then(res => {
      this.props.dispatch(workorderlistActiom(res.data.data.rows))
      if (unlogin(res)) {
        this.setState({
          workorderlist: res.data.data.rows,
          allLen: res.data.data.count
        })
      } else {
        this.props.history.push('/login')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  // 点击搜索
  search () {
    let {on} = this.state;
    this.setState({
      on: !on
    })
    this.reload()
  }
  changeVal1 (e) {
    this.setState({
      val1: e.target.value
    })
  }
  changeVal2 (e) {
    this.setState({
      val2: e.target.value
    })
  }
  render() {
    const { startValue, endValue, endOpen, allLen, pagenum, val1, val2 } = this.state;
    let { workorderlist } = this.props
    return (
      <div className="managesee">
        <div className='see1'>
          <div>
            <span>工单编号：</span>
            <Input placeholder="请输入工单编号" value={val1} onChange={this.changeVal1.bind(this)}/>
          </div>
          <div>
            <span>用户名：</span>
            <Input placeholder="请输入用户名" value={val2} onChange={this.changeVal2.bind(this)}/>
          </div>
          <div>
            <span>问题类型：</span>
            <Select defaultValue="" style={{ width: 150 }} onChange={this.handleChange1.bind(this)}>
              <Option value="1">SN码问题</Option>
              <Option value="2">账号密码问题</Option>
              <Option value="3">宝盒显示未连接，掉线</Option>
              <Option value="4">宝盒wifi功能问题</Option>
              <Option value="5">硬盘无法识别，存储为0</Option>
              <Option value="6">配置后台无法登陆</Option>
              <Option value="7">上行速度异常</Option>
              <Option value="8">宝盒质量有问题，需要换货</Option>
            </Select>
          </div>
        </div>
        <div className='see2'>
          <div>
            <span>状态：</span>
            <Select defaultValue="" style={{ width: 150 }} onChange={this.handleChange2.bind(this)}>
              <Option value="1">未解决</Option>
              <Option value="2">已回复</Option>
              <Option value="3">已解决</Option>
              <Option value="4">已回复未解决</Option>
              <Option value="9">已关闭</Option>
            </Select>
          </div>
          <div className="see2-start">
            <span>提交日期：</span>
            <DatePicker
              disabledDate={this.disabledStartDate}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={startValue}
              placeholder=""
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
              style={{width:150}}
            />
          </div >
          <div className="end">
            <span>至：</span>
            <DatePicker
              disabledDate={this.disabledEndDate}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={endValue}
              placeholder=""
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
              style={{width:150}}
            />
          </div>
          <Button type="primary" onClick={this.search.bind(this)}>搜索</Button>
        </div>
        <TableBox workorderlist={workorderlist} pagenum={pagenum}/>
        <div className="managepage">
          <Pagination showQuickJumper defaultCurrent={1} total={allLen} onChange={this.changePage.bind(this)} />
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    workorderlist: state.Workorderlist.list
  }
}

export default connect(mapStateToProps)(ManageSee)
