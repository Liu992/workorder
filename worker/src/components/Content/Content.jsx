import React, { Component } from 'react'
import './Content.css';
import { Input, Upload, Icon, Modal } from 'antd';
import axios from 'axios'
const { TextArea } = Input;

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      imgArr: [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      ]
    }
  }
  handleCancel = () => {
    this.setState({ 
      previewVisible: false
    })
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({fileList}) => {
    this.setState({ 
      fileList 
    })
  }
  componentDidMount () {
    axios.post('/promo/manage/workorder/list',{
      pageIndex: 1,
      pageSize:10
    })
    .then(res => {
      console.log(res)
    })
  }
  render() {
    console.log(this.props.match.params.id)
    const { previewVisible, previewImage, fileList, imgArr } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className='content-box'>
        <div className="box1">
          <p><span>用户名：</span><span>12345678901</span></p>
          <p><span>手机号：</span><span>12345678901</span></p>
          <p><span>微信号：</span><span>12345678901</span></p>
        </div>
        <div className="box2">
          <p><span>问题编号：</span><span>12345678fsa901</span></p>
          <p><span>问题类型：</span><span>123456asdfa78901</span></p>
          <p><span>提交时间：</span><span>1234sfda5678901</span></p>
        </div>
        <div className="box3">
          <p><span>问题描述：</span><span>了解极乐世界啦放假啦说；的肌肤；发</span></p>
        </div>
        <div className="customerAttachment">
          <span>附件：</span>
          <div className="imgs">
            <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt=""/>
            <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt=""/>
            <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt=""/>
            <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt=""/>
          </div>
        </div>
        <div className="textarea" className="none">
          <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 6, maxRows: 7 }} />
        </div>
        <div className="engineerReply">
          <h3>工程师回复：</h3>
          <p>解决了就是冷静冷静的说了句老师塞卡拉斯京疯了快睡觉啦</p>
          <div className="imgs">
            {
              imgArr.map((item, ind) => {
                return <img src={item} key={ind} alt=""/>
              })
            }
          </div>
        </div>
        <div className="engineerAttachment" style={{display: 'none'}}>
          <span>附件：</span>
          <div className="upload">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} style={{display: 'flex'}}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
        <div className="btn">
          <button>取消</button>
          <button>确认</button>
        </div>
      </div>
    )
  }
}

export default Content