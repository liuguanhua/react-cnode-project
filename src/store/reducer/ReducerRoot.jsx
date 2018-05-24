import { combineReducers } from 'redux'
import Article from './ReducerArticle'
import ReadNews from './ReducerNews'
import rTopicList from './ReduceTopicList'
export default combineReducers({ Article, ReadNews, rTopicList })
