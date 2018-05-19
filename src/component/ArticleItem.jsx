import { Link } from 'react-router-dom'
import LazyImage from '@component/common/LazyImage'

import { formatDate } from '@script/utils'

import '@fonts/svg/write.svg'
import '@fonts/svg/page-views.svg'

const TitleType = props => (
  <span className={props.color + ' ft-white mgr title-type'}>{props.type}</span>
)
TitleType.defaultProps = {
  color: 'bg-sgrey'
}

const ArticleItem = props => {
  const item = props.info
  return (
    <div
      className={'article-item' + (props.addclass ? ` ${props.addclass}` : '')}
    >
      {props.isLinks ? (
        <Link
          to={{
            pathname: `/index/article-details`,
            search: `?id=${item.id}`,
            state: {
              id: item.id
            }
          }}
        >
          <TopicItem {...props} info={item} />
        </Link>
      ) : (
        <TopicItem {...props} info={item} />
      )}
    </div>
  )
}

ArticleItem.defaultProps = {
  isLinks: true
}

const TopicItem = props => {
  const item = props.info
  return (
    <div data-layout="layout" data-layout-align="start center">
      {props.isLazyImg ? (
        <LazyImage
          className="author-avatar mgr bd-radius"
          src={item.author.avatar_url}
          data-layout-flex="0"
          alt=""
        />
      ) : (
        <img
          className="author-avatar mgr bd-radius"
          src={item.author.avatar_url}
          data-layout-flex="0"
          alt=""
        />
      )}
      <div data-ellipsis className="w100">
        <h3 data-ellipsis>
          {/* <Link to={{
                    pathname: `/index/article-details`,
                    search: `?id=${item.id}`,
                    hash: '#the-hash',
                    name: 2,
                    state: {
                        title: '详情',
                        id: item.id
                    }
                }}> */}
          {(() => {
            if (item.top) {
              return <TitleType color="bg-color" type="置顶" />
            }
            if (item.good) {
              return <TitleType color="bg-color" type="精华" />
            }
            switch (item.tab) {
              case 'share':
                return <TitleType type="分享" />
              case 'good':
                return <TitleType color="bg-olor" type="精华" />
              case 'ask':
                return <TitleType type="问答" />
              case 'job':
                return <TitleType type="招聘" />
              case 'dev':
                return <TitleType type="测试" />
            }
          })()}
          {item.title}
        </h3>
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
          {formatDate(item.create_at)}
        </div>
        <div
          className="numFt"
          data-layout="layout"
          data-layout-align="space-between center"
        >
          <span>
            <svg className="svg svg-write">
              <use xlinkHref="#page-views" fill="#b6b6b6" />
            </svg>
            {item.reply_count}/{item.visit_count}
          </span>
          {formatDate(item.last_reply_at)}
        </div>
      </div>
    </div>
  )
}

TopicItem.defaultProps = {
  isLazyImg: true
}

export default ArticleItem
