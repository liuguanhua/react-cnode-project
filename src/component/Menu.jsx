import { NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ActionNews from '@store/actions/ActionNews'

import '@fonts/svg/nall.svg'
import '@fonts/svg/nask.svg'
import '@fonts/svg/njob.svg'
import '@fonts/svg/ngood.svg'
import '@fonts/svg/nshare.svg'
import '@fonts/svg/nhome.svg'
import '@fonts/svg/nnews.svg'
import '@fonts/svg/nissue.svg'
import '@fonts/svg/nuser.svg'

class TabFooNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
    this.isLogin = this.$getStorage()
  }
  /* 	componentWillReceiveProps(prevProps, prevState) {
				const {result} = this.props.ReadNews;
				result && result.success && this.setState({num: result.data});
		} */
  componentDidMount() {
    this.isLogin && this.props.actions.fetchData(this.isLogin.accesstoken)
  }
  render() {
    const { result } = this.props.ReadNews
    const tabmenu = this.props.tabnav.map((item, index) => {
      const isNewsTips = this.isLogin && item.type === 'news'
      return (
        <li key={index}>
          {
            <NavLink
              exact
              to={{
                pathname: item.link,
                search: item.search
              }}
              className={isNewsTips ? 'pr' : ''}
              activeClassName="nav-selected"
            >
              <svg className={'svg svg-nav-default svg-n' + item.type}>
                <use xlinkHref={'#n' + item.type} fill="#cfd6dc" />
              </svg>
              <svg className={'svg svg-nav-active svg-n' + item.type}>
                <use xlinkHref={'#n' + item.type} fill="#639" />
              </svg>
              {isNewsTips && (
                <span
                  className="news-number ft-white bdr-half bg-qgrey pa"
                  data-layout-align="center center"
                  data-layout="layout"
                >
                  {result && result.success ? result.data : 0}
                </span>
              )}
              <p className="ft-grey">{item.name}</p>
            </NavLink>
          }
        </li>
      )
    })
    return (
      <ul data-layout="layout" data-layout-align="space-between center">
        {tabmenu}
      </ul>
    )
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    const getLogin = this.$getStorage()
    // console.log(this.props.rTopicList.topicType)
    const meLink = getLogin && getLogin.loginname ? `/user` : '/user/login'
    const tabnav = [
      {
        name: '首页',
        type: 'home',
        link: '/',
        search: `?tab=${this.props.rTopicList.topicType}`
      },
      {
        name: '消息',
        type: 'news',
        link: '/news'
      },
      {
        name: '发表',
        type: 'issue',
        link: '/share'
      },
      {
        name: '我的',
        type: 'user',
        link: meLink,
        search: getLogin ? `?name=${getLogin.loginname}` : ''
      }
    ]
    return (
      <div className="footer-menu pf w100 bl0 z1">
        <TabFooNav {...this.props} tabnav={tabnav} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ReadNews: state.ReadNews, rTopicList: state.rTopicList }
}
const actions = {
  ...ActionNews
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
