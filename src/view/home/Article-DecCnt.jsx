import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ActionReply from '@store/actions/ActionReply'
import ArticleItem from '@component/ArticleItem'
import { NotLogin } from '@component/common/SharedCompt'
import MaskPopups from '@component/common/MaskPopups'

import ArticleComment from './Article-Comment'
import UserComment from './User-Comment'

import '@fonts/svg/operat-del.svg'
import '@fonts/svg/operat-keep-default.svg'
import '@fonts/svg/operat-keep-active.svg'
import '@fonts/svg/meedit.svg'

class ThemeKeep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_collect: props.isKeep
    }
    console.log(props.isKeep)
  }
  topicCollect(id, is_keep) {
    console.log(is_keep)
    if (is_keep) return this.userWithCollect(id, 'collect') //收藏
    return this.userWithCollect(id, 'de_collect') //取消收藏
  }
  userWithCollect(id, url, callback) {
    const isLogin = this.$getStorage()

    isLogin &&
      this.$request({
        method: 'post',
        url: `topic_collect/${url}`,
        data: {
          accesstoken: isLogin.accesstoken,
          topic_id: id
        },
        success: result => {
          result.success && this.setState({ is_collect: true })
        }
      })
  }
  render() {
    const { topicId } = this.props
    return (
      <div>
        {this.state.is_collect ? (
          <span onClick={this.topicCollect.bind(this, topicId)}>
            <svg className="svg svg-operat-keep-active">
              <use xlinkHref="#operat-keep-active" fill="#936" />
            </svg>
            <span className="vam">取消收藏</span>
          </span>
        ) : (
          <span onClick={this.topicCollect.bind(this, topicId, true)}>
            <svg className="svg svg-operat-keep-default">
              <use xlinkHref="#operat-keep-default" />
            </svg>
            <span className="vam">收藏</span>
          </span>
        )}
      </div>
    )
  }
}

class ArticleDecCnt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPopups: false,
      listh: 0
    }
    this.userInfo = this.$getStorage()
  }
  SendCancelRun() {
    this.setState({ isPopups: false })
  }
  SendDeterMine(id) {
    this.$request({
      method: 'post',
      url: `topic_collect/de_collect`,
      data: {
        accesstoken: this.userInfo.accesstoken,
        topic_id: this.props.info.data.id
      },
      success: result => {
        // this     .props     .history     .push({pathname: '/'});
      }
    })
  }
  getElHeight(h) {
    this.setState({ listh: h })
  }
  render() {
    const { data } = this.props.info
    const createMarkup = () => {
      return { __html: data.content }
    }
    const isLogin = this.userInfo
    return (
      <section
        className="article-details"
        style={{
          paddingBottom: '2.5rem'
        }}
      >
        <ArticleItem isLinks={false} info={data} />
        {/* {isLogin && <div className='article-operat bg-white pd'>
                    {data.author_id === isLogin.id
                        ? <div data-layout='layout' data-layout-align='space-between center'>
                                <div>
                                    <svg className='svg svg-meedit'>
                                        <use xlinkHref='#meedit'></use>
                                    </svg>
                                    <span className='vam'>编辑</span>
                                </div>
                                <div
                                    onClick={() => {
                                    this.setState({isPopups: true})
                                }}>
                                    <svg className='svg svg-operat-del'>
                                        <use xlinkHref='#operat-del'></use>
                                    </svg>
                                    <span className='vam'>删除</span>
                                </div>
                                <ThemeKeep topicId={data.id} isKeep={data.is_collect}/>
                            </div>
                        : <div data-layout='layout' data-layout-align='space-between center'>
                            <ThemeKeep topicId={data.id} isKeep={data.is_collect}/>
                        </div>
}
                </div>} */}
        <div
          className="pd markdown-body mgt bg-white"
          dangerouslySetInnerHTML={createMarkup()}
        />
        <ArticleComment
          getElHeight={this.getElHeight.bind(this)}
          {...this.props}
          info={data}
        />
        <div
          className="pf w100 bl0 z3 fixed-bottom-wrap bg-white"
          style={Object.assign(
            {},
            !isLogin && {
              paddingTop: '.5rem'
            }
          )}
        >
          {isLogin ? (
            <UserComment
              listh={this.state.listh}
              info={data}
              {...this.props}
              {...isLogin}
            />
          ) : (
            <NotLogin isLogo={false} />
          )}
        </div>
        {this.state.isPopups && (
          <MaskPopups
            SendCancelRun={this.SendCancelRun.bind(this)}
            SendDeterMine={this.SendDeterMine.bind(this)}
            title="确定删除!"
          />
        )}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { Article: state.Article }
}
const actions = {
  ...ActionReply
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDecCnt)
