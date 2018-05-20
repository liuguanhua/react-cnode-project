import { Link } from 'react-router-dom'
import LazyImage from '@component/common/LazyImage'
import classNames from 'classnames'

import '@fonts/svg/thumbs.svg'
import '@fonts/svg/comment.svg'
class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: this.$getStorage(),
      userTotalUps: this.props.item.ups
    }
  }
  UserLike(loginname, id, i) {
    //用户点赞
    const { isLogin } = this.state
    const uid = isLogin && isLogin.id
    if (!isLogin) {
      return this.props.history.push('/user/login')
    } else if (isLogin && isLogin.loginname === loginname) {
      return this.$showMsg('亲,不能给自己点赞!')
    }
    this.$request({
      method: 'post',
      url: `/reply/${id}/ups`,
      data: {
        accesstoken: isLogin.accesstoken
      },
      success: result => {
        let curUps = this.props.item.ups
        if (result.success) {
          if (result.action === 'down') {
            //取消点赞
            curUps.map((item, index) => {
              item === uid && curUps.splice(index, 1)
            })
          } else {
            curUps.push(uid)
          }
          this.setState({ userTotalUps: curUps })
        }
      }
    })
  }
  userIsUp(arr) {
    //是否点赞
    const id = this.state.isLogin ? this.state.isLogin.id : ''
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === id) return true
    }
    return false
  }
  replyTopic(name, reply_id, isAtmuch) {
    //用户评论
    const { isLogin } = this.state
    if (!isLogin) {
      return this.props.history.push('/user/login')
    }
    this.props.sendcnt({ name, reply_id })
  }
  render() {
    const { author, content, ups, id } = this.props.item
    let index = this.props.index
    const createMarkup = () => {
      return { __html: content }
    }
    const isUp = this.userIsUp(ups)
    return (
      <li
        key={index}
        className={classNames({
          'bg-qgrey': index % 2 === 0
        })}
        data-layout="layout"
        data-layout-align="start start"
      >
        <div data-layout-flex="0">
          <Link
            to={{
              pathname: '/user',
              search: `?name=${author.loginname}`
            }}
          >
            <LazyImage
              className="author-avatar mgr bd-radius"
              src={author.avatar_url}
              alt=""
            />
          </Link>
          <p className="tc ft-sgrey mgt">{++index}楼</p>
        </div>
        <div className="pdl w100 user-comment-cnt">
          <h3 onClick={this.replyTopic.bind(this, author.loginname, id, 0)}>
            {author.loginname}
          </h3>
          <div
            className="mgt markdown-body"
            dangerouslySetInnerHTML={createMarkup()}
          />
          <div className="tr">
            <span className="user-thumbs">
              <svg
                className="svg svg-thumbs"
                onClick={this.UserLike.bind(this, author.loginname, id, index)}
              >
                <use xlinkHref="#thumbs" fill={isUp ? '#639' : ''} />
              </svg>
              {ups.length ? ups.length : ''}
            </span>
            <svg
              className="svg svg-comment"
              onClick={this.replyTopic.bind(this, author.loginname, id, 0)}
            >
              <use xlinkHref="#comment" />
            </svg>
          </div>
        </div>
      </li>
    )
  }
}

export default class ArticleComment extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getElHeight(this.refs.replyList.scrollHeight)
  }
  render() {
    const { replies, reply_count } = this.props.info
    return (
      <div>
        <div
          className="bg-color mgtb"
          data-layout="layout"
          data-layout-align="center center"
        >
          <svg className="svg svg-comment">
            <use xlinkHref="#comment" fill="#fff" />
          </svg>
          <h2 className="comment-title tc ft-white ilbk">
            共{reply_count}条评论!
          </h2>
        </div>
        <ul ref="replyList" className="bg-white article-comment-list">
          {replies.map((item, index) => {
            return (
              <CommentList
                {...this.props}
                sendcnt={this.props.actions.sendCnt}
                item={item}
                key={index}
                index={index}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}
