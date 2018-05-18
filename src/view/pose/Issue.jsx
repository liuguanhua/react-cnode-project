import { DetectLogin } from '@component/common/SharedCompt'

class Issue extends React.Component {
  constructor(props) {
    super(props)
    const isLogin = this.$getStorage()
    this.state = {
      title: '',
      content: '',
      tab: 'dev',
      accesstoken: isLogin && isLogin.accesstoken,
      arrRadio: [
        {
          type: 'ask',
          name: '问答',
          isChecked: true
        },
        {
          type: 'share',
          name: '分享',
          isChecked: false
        },
        {
          type: 'job',
          name: '招聘',
          isChecked: false
        },
        {
          type: 'dev',
          name: '测试',
          isChecked: false
        }
      ]
    }
    const { state } = this
    this.themeTitle = e => {
      state.title = e.target.value
    }
    this.themeContent = e => {
      state.content = e.target.value
    }
    this.issueSubmit = () => {
      if (state.title.length < 10) {
        return this.$showMsg('亲,请输入10字以上!')
      } else if (!state.content) {
        return this.$showMsg('亲,请输入内容!')
      }
      const { accesstoken, title, tab, content } = state
      this.$request({
        method: 'post',
        url: 'topics',
        data: { accesstoken, title, tab, content },
        success: result => {
          if (result.success) {
            this.$showMsg('发表成功!')
            this.props.history.push({
              pathname: '/index/article-details',
              search: `?id=${result.topic_id}`
            })
          } else {
            this.$showMsg('发表失败!')
          }
        },
        error: () => {
          this.$showMsg('发表失败!')
        }
      })
    }
  }
  selectThemeCate(i, e) {
    //类型选择
    const { arrRadio } = this.state
    if (arrRadio[i].isChecked) return
    arrRadio.map((item, index) => {
      item.isChecked = Object.is(i, index) ? true : false
    })
    this.setState(
      {
        tab: arrRadio[i].type,
        arrRadio: arrRadio
      },
      () => {
        // console.log(this.state.tab)
      }
    )
  }
  render() {
    return (
      <div className="issue-content-wrap">
        <div className="ipt-row">
          <input
            type="text"
            name="theme-title"
            placeholder="给标题取个名!"
            onInput={this.themeTitle}
            className="bd-none w100 pd"
          />
        </div>
        <div className="ipt-row">
          <textarea
            onInput={this.themeContent}
            placeholder="说点什么吧..."
            name="theme-cnt"
            className="bd-none w100 pd"
          />
        </div>
        <ThemeCate
          arrRadio={this.state.arrRadio}
          selectThemeCate={this.selectThemeCate.bind(this)}
          themeType={this.themeType}
          issueSubmit={this.issueSubmit}
        />
      </div>
    )
  }
}

class ThemeCate extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div
          className="ipt-row pd"
          data-layout-align="space-between center"
          data-layout="layout"
        >
          选择类别{' '}
          {this.props.arrRadio.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  'radio-wrap' + (item.isChecked ? ' select-radio-active' : '')
                }
                data-layout-align="space-between center"
                data-layout="layout"
              >
                <span className="ilbk">
                  <input
                    type="radio"
                    defaultChecked={item.isChecked}
                    name="theme-cate wh100"
                    onClick={this.props.selectThemeCate.bind(this, index)}
                    id={item.type}
                  />
                </span>
                <label htmlFor={item.type}>{item.name}</label>
              </div>
            )
          })}
        </div>
        <div className="ipt-row tc plw theme-issue-submit">
          <input
            className="bd-radius bg-color ft-white bd-none w100 public-button"
            type="submit"
            onClick={this.props.issueSubmit}
            name="btn-submit"
          />
        </div>
      </div>
    )
  }
}

export default DetectLogin({ realuser: Issue })
