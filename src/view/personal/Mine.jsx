import { Link } from 'react-router-dom'
import { Tabs } from 'antd'
import Rstore from 'store'
import qs from 'qs'
import classNames from 'classnames'

import ArticleItem from '@component/ArticleItem'
import LazyImage from '@component/common/LazyImage'
import MaskPopups from '@component/common/MaskPopups'

import { formatDate } from '@script/utils'
import { DetectLogin, LoadLoop, NotResult } from '@component/common/SharedCompt'

import '@fonts/svg/meuser.svg'
import '@fonts/svg/metime.svg'
import '@fonts/svg/mescore.svg'
import '@fonts/svg/write.svg'
import '@fonts/svg/page-views.svg'
import '@fonts/svg/medropout.svg'
import '@fonts/svg/meedit.svg'

const dateFormat = time => {
  const date = new Date(time)
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ]
  return `${year} / ${month} / ${day}`
}

class Mine extends React.Component {
  constructor(props) {
    super(props)
    this.userInfo = this.$getStorage()
    this.state = {
      info: {}
    }
    this.userName = qs.parse(this.props.location.search.slice(1)).name
    if (this.userInfo) {
      this.isUserCur = this.userInfo.loginname === this.userName
    }
  }
  async componentDidMount() {
    const getUserInfo = await this.$request({
      url: `user/${this.userName}`
      // success: (result) => {     this.setState({info: result.data}) }
    })
    if (getUserInfo) {
      this.$request({
        url: `topic_collect/${this.userName}`,
        success: result => {
          const { info } = this.state
          info['collect'] = result.data
          const data = Object.assign({}, info, getUserInfo.data)
          this.setState({ info: data })
        }
      })
    }
  }
  render() {
    const { info } = this.state
    return info.loginname ? (
      <UserCenter
        {...this.props}
        result={info}
        isUserCur={this.isUserCur}
        userInfo={this.userInfo}
      />
    ) : (
      <LoadLoop />
    )
  }
}

const TabPane = Tabs.TabPane

class UserCenter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPopups: false
    }
  }
  SendCancelRun() {
    this.setState({ isPopups: false })
  }
  SendDeterMine() {
    Rstore.remove('USER_INFO')
    this.props.history.push({ pathname: '/' })
  }
  render() {
    const { result, userInfo, isUserCur } = this.props
    return (
      <section className="user-center">
        <div className="user-center-info">
          <div
            className="pd"
            data-layout="layout"
            data-layout-align={
              isUserCur ? 'space-between start' : 'start start'
            }
          >
            <LazyImage
              className="author-avatar bdr-half bg-white mgr"
              src={result.avatar_url}
              data-layout-flex="0"
              alt=""
            />
            <div className="ft-qgrey user-info-row">
              <p>
                <svg className="svg svg-meuser">
                  <use xlinkHref="#meuser" fill="#f3f3f3" />
                </svg>
                {result.loginname}
              </p>
              <p>
                <svg className="svg svg-mescore">
                  <use xlinkHref="#mescore" fill="#f3f3f3" />
                </svg>
                {result.score}分
              </p>
              <p>
                <svg className="svg svg-metime">
                  <use xlinkHref="#metime" fill="#f3f3f3" />
                </svg>
                {dateFormat(result.create_at)}
              </p>
            </div>
            {isUserCur && (
              <div className="ft-qgrey user-info-row">
                <p>
                  <svg className="svg svg-meedit">
                    <use xlinkHref="#meedit" fill="#f3f3f3" />
                  </svg>
                  <Link className="ft-white" to="/share">
                    发布话题
                  </Link>
                </p>
                <p
                  onClick={() => {
                    this.setState({ isPopups: true })
                  }}
                >
                  <svg className="svg svg-medropout">
                    <use xlinkHref="#medropout" fill="#f3f3f3" />
                  </svg>
                  退出
                </p>
              </div>
            )}
          </div>
        </div>
        <Tabs
          className={classNames({ 'container-bottom': isUserCur })}
          defaultActiveKey="1"
        >
          <TabPane tab="发布" key="1">
            <UserTopicList info={result.recent_topics} />
          </TabPane>
          <TabPane tab="回复" key="2">
            <UserTopicList info={result.recent_replies} />
          </TabPane>
          <TabPane tab="收藏" key="3">
            {result.collect.length ? (
              result.collect.map((item, index) => (
                <ArticleItem
                  isLazyImg={false}
                  key={index}
                  info={item}
                  addclass="mgt bg-white"
                />
              ))
            ) : (
              <NotResult />
            )}
          </TabPane>
        </Tabs>
        {this.state.isPopups && (
          <MaskPopups
            SendCancelRun={this.SendCancelRun.bind(this)}
            SendDeterMine={this.SendDeterMine.bind(this)}
            title="确定退出!"
          />
        )}
      </section>
    )
  }
}

const UserTopicList = props => {
  const { info } = props
  return (
    <div>
      {info.length ? (
        info.map((item, index) => {
          return (
            <div key={index} className="article-item mgt bg-white">
              <Link
                data-layout="layout"
                data-layout-align="start center"
                to={{
                  pathname: `/index/article-details`,
                  search: `?id=${item.id}`,
                  state: {
                    id: item.id
                  }
                }}
              >
                <img
                  className="author-avatar mgr bd-radius"
                  src={item.author.avatar_url}
                  data-layout-flex="0"
                  alt=""
                />
                <div data-ellipsis className="w100">
                  <h3 data-ellipsis>{item.title}</h3>
                  <div
                    className="numFt mgtb"
                    data-layout="layout"
                    data-layout-align="space-between center"
                  >
                    <span>
                      <svg className="svg svg-write">
                        <use xlinkHref="#write" fill="#b6b6b6" />
                      </svg>
                      {item.author.loginname}
                    </span>
                    {formatDate(item.last_reply_at)}
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      ) : (
        <NotResult />
      )}
    </div>
  )
}

export default Mine
