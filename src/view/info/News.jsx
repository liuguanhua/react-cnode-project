import { Link } from 'react-router-dom'
import { DetectLogin, LoadLoop, NotResult } from '@component/common/SharedCompt'
import { Tabs } from 'antd'
import { formatDate } from '@script/utils'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ActionNews from '@store/actions/ActionNews'

const TabPane = Tabs.TabPane

class UserNews extends React.Component {
  constructor(props) {
    super(props)
    this.userInfo = this.$getStorage()
    this.state = {
      info: {}
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    this.$request({
      url: `messages`,
      params: {
        mdrender: false,
        accesstoken: this.userInfo.accesstoken
      },
      success: result => {
        this.setState({ info: result })
      }
    })
  }
  render() {
    const { info } = this.state
    return (
      <div>
        {info.data ? (
          <NewsContent
            {...this.props}
            data={info.data}
            afresh={this.fetchData.bind(this)}
          />
        ) : (
          <LoadLoop />
        )}
      </div>
    )
  }
}

class NewsContent extends React.Component {
  constructor(props) {
    super(props)
    this.userInfo = this.$getStorage()
  }
  clearReadMsg() {
    this.$request({
      method: 'post',
      url: `message/mark_all`,
      data: {
        accesstoken: this.userInfo.accesstoken
      },
      success: result => {
        console.log(result)
        this.props.afresh()
        this.props.actions.fetchData()
        this.userInfo && this.props.actions.fetchData(this.userInfo.accesstoken)
      }
    })
  }
  render() {
    const { data } = this.props
    const [hasMsgLen, hasNotMsgLen] = [
      data.has_read_messages.length,
      data.hasnot_read_messages.length
    ]
    return (
      <div className="news-content container-bottom">
        <Tabs defaultActiveKey="1">
          <TabPane tab={`未读消息(${hasNotMsgLen})`} key="1">
            {hasNotMsgLen ? (
              data.hasnot_read_messages.map((item, index) => {
                return <NewsList item={item} key={index} />
              })
            ) : (
              <NotResult text="暂无消息!" />
            )}
          </TabPane>
          <TabPane tab={`已读消息(${hasMsgLen})`} key="2">
            {hasMsgLen ? (
              data.has_read_messages.map((item, index) => {
                return <NewsList item={item} key={index} />
              })
            ) : (
              <NotResult text="暂无消息!" />
            )}
            {/* <div className="tc mgt">
              <button
                onClick={this
                .clearReadMsg
                .bind(this)}
                className="clear-unread-msg ft-white bg-color bd-radius">清空未读消息</button>
            </div> */}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
const NewsList = props => {
  const { item } = props
  const createMarkup = () => {
    return { __html: item.reply.content }
  }
  return (
    <div className="article-item mgt">
      <div data-layout="layout" data-layout-align="start start">
        <img
          className="author-avatar mgr bd-radius"
          src={item.author.avatar_url}
          data-layout-flex="0"
          alt=""
        />
        <div className="w100">
          <h3
            data-ellipsis
            data-layout="layout"
            data-layout-align="space-between center"
          >
            <span className="title-cnt" data-ellipsis>
              {item.author.loginname}
            </span>
            {formatDate(item.create_at)}
          </h3>
          <div className="mgt">
            <div>
              在话题<Link
                className="ft-color"
                to={{
                  pathname: `/index/article-details`,
                  search: `?id=${item.topic.id}`,
                  state: {
                    id: item.topic.id
                  }
                }}
              >
                {item.topic.title}
              </Link>
              {item.type === 'at' ? '中@了你!' : '回复了你!'}
              <div
                className="mgt markdown-body"
                dangerouslySetInnerHTML={createMarkup()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default DetectLogin({realuser: UserNews})
const mapStateToProps = state => {
  return { ReadNews: state.ReadNews }
}
const actions = {
  ...ActionNews
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(
  DetectLogin({ realuser: UserNews })
)
