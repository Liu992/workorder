import React, { Component } from 'react';
import './ManageSee.css';
import { Input, Menu, Dropdown, Button, Icon, message, DatePicker, Select, Pagination } from 'antd';
import TableBox from './Table'
import axios from 'axios';
import unlogin from '../../until/unlogin';
const Option = Select.Option;


class ManageSee extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startValue: null, //开始时间
      endValue: null,// 结束时间
      endOpen: false,
      workorderlist: [],// 工单列表
      allLen: 0 // 列表总长度
    }
  }
  // 分页
  changePage(pageNumber) {
    axios.post('/promo/manage/workorder/list', {
      pageIndex: pageNumber,
      pageSize: 10
    })
    .then(res => {
      if (unlogin(res)) {
        console.log(res)
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
  // 问题类型
  handleChange1(value) {
    console.log(`selected ${value}`);
  }
  // 状态
  handleChange2(value) {
    console.log(`selected ${value}`);
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
        console.log(res)
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
  render() {
    const { startValue, endValue, endOpen, workorderlist, allLen } = this.state;
    return (
      <div className="managesee">
        <div className='see1'>
          <div>
            <span>工单编号：</span>
            <Input placeholder="default size" />
          </div>
          <div>
            <span>用户名：</span>
            <Input placeholder="default size" />
          </div>
          <div>
            <span>问题类型：</span>
            <Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange1.bind(this)}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
        </div>
        <div className='see2'>
          <div>
            <span>状态：</span>
            <Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange2.bind(this)}>
              <Option value="已解决">已解决</Option>
              <Option value="未解决">未解决</Option>
              <Option value="已回复">已回复</Option>
              <Option value="已回复未解决">已回复未解决</Option>
              <Option value="已关闭">已关闭</Option>
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
          <Button type="primary">搜索</Button>
        </div>
        <TableBox workorderlist={workorderlist}/>
        <div className="managepage">
          <Pagination showQuickJumper defaultCurrent={2} total={allLen} onChange={this.changePage.bind(this)} />
        </div>
      </div>
    )
  }
}
export default ManageSee
