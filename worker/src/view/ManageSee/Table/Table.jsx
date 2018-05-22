import React, { Component } from 'react';
import './Table.css'

class TableBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: {
        1: "未解决", 2: "已回复", 3: "已解决", 4: "已回复未解决", 9: "关闭"
      }
    }
  }
  render() {
    const { workorderlist } = this.props;
    let { status } = this.state
    console.log(workorderlist)
    return (
      <div className="table">
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
              workorderlist.map((item, ind) => {
                return (
                  <tr key={item.id}>
                    <td>{item.account}</td>
                    <td>{item.account}</td>
                    <td>{item.questionTypeText}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.statusText}</td>
                    <td><span>处理</span><span>查看</span></td>
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
export default TableBox