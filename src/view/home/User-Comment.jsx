import '@fonts/svg/send.svg'
import { Link } from 'react-router-dom'
export default class UserComment extends React.Component {
  constructor(props) {
    super(props)
    const isLogin = this.$getStorage()
    this.state = {
      accesstoken: isLogin && isLogin.accesstoken,
      content: '',
      reply_id: ''
    }
  }
  newCommentSubmit() {
    const { state } = this
    if (!state.content) {
      return this.$showMsg('亲,忘了输内容了!')
    }
    this.props.actions.fetchData(
      {
        ...state,
        reply_id: this.state.reply_id
      },
      () => {
        this.setState({ content: '' })
        window.scrollTo(
          0,
          document.documentElement.scrollHeight || this.props.listh
        )
      }
    )
  }
  handleChange(e) {
    this.setState({ content: e.target.value })
  }
  EnterSubmit(e) {
    if (e.keyCode == 13) this.newCommentSubmit()
  }
  /* shouldComponentUpdate(nextProps, nextState) {
    const {reply_content} = nextProps.info.data;
    if (reply_content) {
      const isUpdate = (this.state.value !== `@${reply_content.name}`) || (this.state.reply_id !== `${reply_content.reply_id}`);
      return isUpdate;
    }
    return true;
  } */
  componentWillReceiveProps(prevProps, prevState) {
    const { reply_content } = prevProps.info.data
    if (reply_content && this.state.reply_id !== `${reply_content.reply_id}`) {
      this.setState({
        content: `@${reply_content.name} `,
        reply_id: `${reply_content.reply_id}`
      })
    }
  }
  render() {
    const { data } = this.props.info
    return (
      <div id="room-speak" className="room-speak">
        <div data-layout-align="space-between center" data-layout="layout">
          <div
            className="bg-white small-avatar-wrap"
            data-layout="layout"
            data-layout-flex="0"
            data-layout-align="center center"
          >
            <Link
              to={{
                pathname: '/user',
                search: `name=${this.props.loginname}`
              }}
            >
              <img
                className="small-author-avatar bdr-half"
                src={this.props.avatar_url}
                alt=""
              />
            </Link>
          </div>
          <div className="ipt-txt-wrap w100 pr">
            <input
              placeholder="朕说两句..."
              ref="commentIptcnt"
              type="text"
              id="ipt-txt"
              value={this.state.content}
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.EnterSubmit.bind(this)}
              name="comment-iptcnt"
              className="ipt w100"
            />
          </div>
          <div className="speak-submit-wrap bg-white">
            <button
              id="btn-speak-submit"
              type="submit"
              onClick={this.newCommentSubmit.bind(this)}
              className="btn-speak-submit bg-white w100"
            >
              <svg className="svg svg-send" data-svg-wh="1">
                <use xlinkHref="#send" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
