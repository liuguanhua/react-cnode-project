import { connect } from 'react-redux'
import Tloader from './react-touch-loader'
import ArticleItem from '@component/ArticleItem'
import aHomeTopic from '@store/actions/ActionTopicList'
import './load-more.less'
class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canRefreshResolve: 1,
      hasMore: 1,
      infoList: props.rTopicList.result,
      isLoadData: true,
      initializing: props.rTopicList.result.length ? 2 : 1,
      refreshedAt: Date.now()
    }
    this.refScroll = null
  }
  componentWillReceiveProps(nextProps) {
    !Object.is(nextProps.type, this.props.type) &&
      this.setState(
        {
          // infoList: [],
          hasMore: 1
        },
        () => {
          this.refresh()
        }
      )
  }
  componentDidMount() {
    const { page, scrollTop } = this.props.rTopicList
    !page && this.loadData()
    !this.refScroll && (this.refScroll = this.refs.scrollCnt.refs.panel)
    scrollTop && (this.refScroll.scrollTop = scrollTop)
  }
  refresh(resolve, reject) {
    this.setState(
      {
        hasMore: 1
      },
      () => {
        this.loadData(resolve, 'reset')
      }
    )
  }
  componentWillUnmount() {
    const { dispatch, rTopicList } = this.props
    dispatch(aHomeTopic.recordScrollSite(this.refScroll.scrollTop)) //保存滚动条位置
  }

  loadData(resolve, reset) {
    //加载数据
    const { infoList } = this.state
    const isReset = reset === 'reset'
    const page = isReset ? 1 : Math.ceil(infoList.length / 10) + 1
    this.$request({
      url: 'topics',
      params: {
        page,
        tab: this.props.type,
        limit: 10
      },
      success: result => {
        if (this.state.isLoadData) {
          const { data } = result
          this.setState({
            infoList: isReset ? data : infoList.concat(data),
            hasMore: 1,
            initializing: 2,
            // initialized
            loadState: 'loaded'
          })
          const { dispatch, rTopicList, type } = this.props
          ;(!Object.is(rTopicList.page, page) || isReset) &&
            dispatch(
              aHomeTopic.keepTopic({
                data,
                page,
                type,
                isReset
              })
            )
          if (isReset) {
            //不同类型 or 刷新重置滚动条
            window.scrollTo(0, 0)
            this.refScroll.scrollTop = 0
          }
          // if (Math.ceil(infoList.length / 10) === 2) {
          if (data.length < 10) {
            this.setState({ hasMore: false })
          }
          resolve && resolve()
        }
      }
    })
  }
  render() {
    const { hasMore, initializing } = this.state
    const { infoList } = this.state
    return (
      <div className="load-more-view loadmore-wrap container-bottom">
        <Tloader
          ref="scrollCnt"
          className="main"
          onRefresh={this.refresh.bind(this)}
          onLoadMore={this.loadData.bind(this)}
          hasMore={hasMore}
          initializing={initializing}
        >
          <div className="article-list">
            {infoList.map((item, index) => (
              <ArticleItem
                key={index}
                info={item}
                isLazyImg={false}
                addclass="mgt bg-white"
              />
            ))}
          </div>
        </Tloader>
      </div>
    )
  }
}

export default connect((state, action) => {
  return {
    rTopicList: state.rTopicList
  }
})(LoadMore)
