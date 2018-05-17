import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'qs'

import ActionArticle from '@store/actions/ActionArticle'

import ArticleDecCnt from './Article-DecCnt'
import { LoadLoop, LoadFail } from '@component/common/SharedCompt'

import 'github-markdown-css'
class ArticleDeatils extends React.Component {
  constructor(props) {
    super(props)
    this.props.actions.fetchData(
      qs.parse(this.props.location.search.slice(1)).id
    )
  }
  render() {
    const { isLoad } = this.props.Article
    return isLoad ? (
      <LoadLoop />
    ) : this.props.Article.result && this.props.Article.result.success ? (
      <ArticleDecCnt {...this.props} info={this.props.Article.result} />
    ) : (
      <LoadFail />
    )
  }
}
const mapStateToProps = state => {
  return { Article: state.Article }
}
const actions = {
  ...ActionArticle
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDeatils)
