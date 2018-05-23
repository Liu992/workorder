import React, { Component } from 'react'
import './Content.css';
import { Input, Upload, Icon, Modal, Select } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux'
const { TextArea } = Input;
const Option = Select.Option;

let mapStateToProps = (state) => {
  return {
    data: state.Itemworkorder.data
  }
}
@connect(mapStateToProps)
class ContentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      txtarea: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      data: '',
      value: '',
      files: [],
      unremove: true,
      usernames: []
    }
  }
  // 点击X关闭放大图
  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  }
  // 点击放大图
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  // 上传图片
  handleChange = ({file, fileList}) => {
    let { files, unremove } = this.state
    let newfiles = files;
    if (unremove) {
      if (file.response != undefined) {
        newfiles.push(file.response.data)
        this.setState({
          files: newfiles,
          unremove: true
        })
      } 
    } else {
      for (let i = 0; i < newfiles.length; i++) {
        if (file.name == newfiles[i].oriFileName) {
          newfiles.splice(i,1);
          this.setState({
            files: newfiles,
            unremove: true
          })
        }
      }
    }
    this.setState({
      fileList
    })
  }
  // 删除上传图片
  changeRemove  (a) {
    this.setState({
      unremove: false
    })
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    axios.post('/promo/manage/workorder/getworkorder', {
      workOrderId: id
    })
      .then(res => {
        this.setState({
          data: res.data.data
        })
      })
      .catch(err => {
        console.log(err)
      })

    // 客服列表
      axios.post('/promo/manage/workorder/getServices')
      .then(res => {
        this.setState({
          usernames: res.data.data
        })
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
  // 转移
  transfer() {
    this.showModal()
  }
  // 输入回复
  changeTxT(e) {
    this.setState({
      txtarea: e.target.value
    })
  }
  // 返回
  onGo() {
    this.props.history.go(-1)
  }
  // 提交
  subReply() {
    let { id } = this.props.match.params;
    axios.post('/promo/manage/workorder/reply', {
      workOrderId: id,
      replyContent: this.state.txtarea,
      files: this.state.files
    })
      .then(res => {
        console.log(res)
        if (res.data.success) {
          alert('提交成功')
          this.props.history.push('/manage/all')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  // 更改转移用户
  handleChange2(value) {
    this.setState({
      value: value
    })
  }
  // 点确认转移
  handleOk = (e) => {
    let { id } = this.props.match.params;
    axios.post('/promo/manage/workorder/transfer',{
      workOrderId: id,
      newServiceId: this.state.value
    })
    .then(res => {
      console.log(res)
      if (res.data.success) {
        this.props.history.push('/manage/all')
      } else {
        alert('转移失败')
      }
    })
    this.setState({
      visible: false,
    });
  }
  // 点取消转移
  handleCancel1 = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { previewVisible, previewImage, fileList, data, txtarea, usernames } = this.state;
    let { txt, status } = this.props.location.state;
    let record = []
    if (data.serviceHistory != undefined) {
      record = JSON.parse(data.serviceHistory)
    }
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className='content-box'>
        <div className="box1">
          <p><span>用户名：</span><span>{data.account}</span></p>
          <p><span>手机号：</span><span>{data.userPhone}</span></p>
          <p><span>微信号：</span><span>{data.userWechat}</span></p>
        </div>
        <div className="box2">
          <p><span>问题编号：</span><span>{data.orderCode}</span></p>
          <p><span>问题类型：</span><span>{data.questionTypeText}</span></p>
          <p><span>提交时间：</span><span>{data.updatedAt}</span></p>
        </div>
        <div className="box3">
          <p><span>问题描述：</span><span>{data.questionContent}</span></p>
        </div>
        <div className="customerAttachment">
          <span>附件：</span>
          <div className="imgs">
            {
              data.userFiles && data.userFiles.map((item, ind) => {
                return (
                  <img key={ind} src={`/promo/upload/${item.filePath}`} alt="" />
                )
              })
            }
          </div>
        </div>
        <div className="textarea" className={txt == '处理' ? '' : 'none'}>
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autosize={{ minRows: 6, maxRows: 7 }}
            onChange={this.changeTxT.bind(this)}
            value={txtarea} />
        </div>
        <div className="box3">
          <p><span>转移记录：</span>
            {
              record.map((item, ind) => {
                return <span key={ind}>{ind>0? ' >> ':''}{item}</span>
              })
            }
          </p>
        </div>
        <div className="engineerReply" style={{ display: txt == '处理' ? 'none' : '' }}>
          <h3>工程师回复：</h3>
          <p>{data.replyContent}</p>
          <div className="imgs">
            {
              data.serviceFiles != undefined && data.serviceFiles.map((item, ind) => {
                return item.isImg?<img src={`/promo/upload/${item.filePath}`} key={ind} alt="" />:<a target="_blank" href={`/promo/upload/${item.filePath}`} key={ind}>{item.oriFileName}</a>
              })
            }
          </div>
        </div>
        <div className="engineerAttachment" style={{ display: txt == '处理' ? '' : 'none' }}>
          <span>附件：</span>
          <div className="upload">
            <Upload
              action="/promo/workorder/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              onRemove={this.changeRemove.bind(this)}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} style={{ display: 'flex' }}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
        {
          txt == '查看' && status == '已回复未解决' ? <div>用户选择问题仍未解决，请及时致电用户</div> : ''
        }
        {
          txt == '处理' ? <div className="btn">
            <button onClick={this.onGo.bind(this)}>取消</button>
            <button onClick={this.subReply.bind(this)}>提交</button>
            <button onClick={this.transfer.bind(this)}>转移</button>
          </div> : <div className="btn">
              <button onClick={this.onGo.bind(this)}>返回</button>
            </div>
        }
        <Modal
          title={'转移'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel1}
          mask={false}
          width='320px'
          cancelText="取消"
          okText="确认"
          bodyStyle={{ textAlign: 'center' }}
          style={{ textAlign: 'center' }}
        >
          {
            <Select defaultValue="" style={{ width: 150 }} onChange={this.handleChange2.bind(this)}>
              {
                usernames.map((item, ind) => {
                  return <Option key={item.id} value={item.id}>{item.nickname}</Option>
                })
              }
            </Select>
          }
        </Modal>
      </div>
    )
  }
}

export default ContentBox