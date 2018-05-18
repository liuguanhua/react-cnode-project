import { Link } from 'react-router-dom'
// import PropTypes from "prop-types";

import { setStorage } from '@script/utils'

export class UserLogin extends React.Component {
  // static contextTypes = {   router: PropTypes.object }
  constructor(props) {
    super(props)
    this.state = {
      btnval: '登录'
    }
    this.loginSubmit = this.loginSubmit.bind(this)
  }
  enterSumit(e) {
    Object.is(e.keyCode, 13) && this.loginSubmit()
  }
  loginSubmit() {
    const UserTokenVal = this.refs.userToken.value
    if (!UserTokenVal) {
      return this.$showMsg('亲,token不能为空!')
    }
    this.setState({ btnval: '登录中...' })
    this.$request({
      method: 'post',
      url: `accesstoken`,
      data: {
        accesstoken: UserTokenVal
      },
      success: result => {
        if (result.success) {
          this.$showMsg('登录成功!')
          result['accesstoken'] = UserTokenVal
          setStorage('USER_INFO', result)
          this.props.history.push({
            pathname: '/user',
            search: `?name=${result.loginname}`
          })
        } else {
          this.$showMsg('登录失败!')
          this.setState({ btnval: '登录' })
        }
      },
      error: () => {
        this.$showMsg('登录失败!')
        this.setState({ btnval: '登录' })
      }
    })
  }
  render() {
    return (
      <div className="user-login-form">
        <div className="ipt-row">
          <input
            ref="userToken"
            className="bd-radius bd-none pdl"
            type="text"
            name="user-token"
            onKeyDown={this.enterSumit.bind(this)}
            placeholder="Access Token"
          />
        </div>
        <div className="ipt-row">
          <input
            className="bd-radius bg-color ft-white bd-none"
            type="submit"
            value={this.state.btnval}
            onClick={this.loginSubmit}
            name="btn-submit"
          />
        </div>
      </div>
    )
  }
}

export const NotLogin = props => {
  return (
    <div className="not-login-wrap tc">
      {props.isLogo && (
        <img
          className="not-login-photo"
          src={require('@images/logo.png')}
          alt=""
        />
      )}
      <h2 data-layout-align="center center" data-layout="layout">
        还未登录，现在就去<Link className="ft-color" to="/user/login">
          登录
        </Link>
      </h2>
    </div>
  )
}

NotLogin.defaultProps = {
  isLogo: true
}

export const DetectLogin = props => {
  class LoginStatus extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      if (this.$getStorage()) return <props.realuser {...this.props} />
      return <NotLogin />
    }
  }
  return LoginStatus
}

export const LoadLoop = () => <div className="tc pdtb">玩命加载中...</div>
export const LoadFail = () => <div className="tc pdtb">加载失败!</div>
export const NotResult = props => <div className="tc pdtb">{props.text}</div>

NotResult.defaultProps = {
  text: '暂无数据!'
}
