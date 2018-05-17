import { NavLink } from 'react-router-dom'
import qs from 'qs'

import LoadMoreInfo from '@component/plugin/touch-loadmore/LoadMore'

const arrTabHead = [
  {
    name: '全部',
    link: '/',
    type: 'all'
  },
  {
    name: '精华',
    link: '/?tab=good',
    type: 'good'
  },
  {
    name: '分享',
    link: '/?tab=share',
    type: 'share'
  },
  {
    name: '问答',
    link: '/?tab=ask',
    type: 'ask'
  },
  {
    name: '招聘',
    link: '/?tab=job',
    type: 'job'
  },
  {
    name: '测试',
    link: '/?tab=dev',
    type: 'dev'
  }
]

const ListPhoto = props => {
  const tabName = props.text || []
  const dataItem = tabName.length
    ? tabName.map((item, index) => (
        <li key={index}>
          {index}
          {item.slide_name}
        </li>
      ))
    : '加载中...'
  return <ul>{dataItem}</ul>
}
const TabNav = props => {
  const activeTab = {}
  activeTab[props.type] = 'ft-color'
  return (
    <nav className="pf w100 l0 z1 nav-top-fixed">
      <ul
        className="tab-nav-list bg-white tc"
        data-layout="layout"
        data-layout-align="space-between center"
      >
        {arrTabHead.map((item, index) => (
          <li key={index}>
            <NavLink to={item.link} className={activeTab[item.type]}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // console.log(this.refs.ArticleList)
  }
  shouldComponentUpdate(nextProps, nextState) {
    const curPath = qs.parse(nextProps.location.search.slice(1)).tab || 'all'
    const goPath = qs.parse(this.props.location.search.slice(1)).tab || 'all'
    return curPath !== goPath
  }
  render() {
    const tabType = qs.parse(this.props.location.search.slice(1)).tab || 'all'
    return (
      <div>
        <TabNav type={tabType} />
        <LoadMoreInfo ref="ArticleList" type={tabType} />
      </div>
    )
  }
}
