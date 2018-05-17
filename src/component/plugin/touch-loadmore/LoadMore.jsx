import Tloader from './react-touch-loader'
import ArticleItem from '@component/ArticleItem'
import './load-more.less'
export default class LoadMore extends React.Component {
  constructor() {
    super()
    this.state = {
      canRefreshResolve: 1,
      hasMore: 0,
      infoList: [],
      isLoadData: true,
      initializing: 1,
      refreshedAt: Date.now()
    }
    this.refScroll = null
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        // infoList: [],
        hasMore: 1
      },
      () => {
        window.scrollTo(0, 0) //不同类型重置滚动条
        this.refScroll.scrollTop = 0
        // this.loadData(resolve,'reset');
        this.refresh()
      }
    )
  }
  componentDidMount() {
    this.loadData()
    this.refScroll = this.refs.scrollCnt.refs.panel
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
  loadData(resolve, reset) {
    //加载数据
    const { infoList } = this.state
    const isReset = reset === 'reset'
    this.$request({
      url: 'topics',
      params: {
        page: isReset ? 1 : Math.ceil(infoList.length / 10) + 1,
        tab: this.props.type,
        limit: 10
      },
      success: result => {
        if (this.state.isLoadData) {
          this.setState({
            infoList: isReset ? result.data : infoList.concat(result.data),
            hasMore: 1,
            initializing: 2, // initialized
            loadState: 'loaded'
          })
          // if (Math.ceil(infoList.length / 10) === 2) {
          if (result.data.length < 10) {
            this.setState({ hasMore: false })
          }
          resolve && resolve()
        }
      }
    }).then(() => {
      // console.info('加载成功！');
    })
  }
  render() {
    const { hasMore, initializing, refreshedAt, canRefreshResolve } = this.state
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
