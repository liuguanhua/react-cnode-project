import { Router, HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { BackTop } from 'antd'
import classNames from 'classnames'
import qs from 'qs'

import history from '@script/history'
import { getStorage } from '@script/utils'
import RouteConfig from '@script/routers'

import Header from '@component/Header'
import Menu from '@component/Menu'
import SubHeader from '@component/SubHeader'

import '@fonts/svg/gotop.svg'

const RouteWithSubRoutes = route => (
  <Route
    exact
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
)
const findMatch = path => RouteConfig.find(f => f.path == path)

export default () => {
  let isUserCur = true
  let queryName = null
  const arrPathName = ['/index/article-details', '/', '/news', '/user']
  return (
    <Route
      render={({ location }) => {
        const { pathname, search } = location
        const getRoutes = findMatch(pathname)
        const isBackTop = arrPathName.includes(pathname)
        const isAdd = getRoutes && pathname.split('/').length < 3
        const classMain = classNames('tl0 w100 view-main', {
          'pa h100': Object.is(pathname, '/'),
          container: isAdd,
          'container-top': !isAdd,
          'bg-white': Object.is(pathname, '/share')
        })
        //当前用户
        if (Object.is(pathname, '/user')) {
          const userInfo = getStorage()
          queryName = qs.parse(search.slice(1)).name
          isUserCur = userInfo && Object.is(userInfo.loginname, queryName)
        }
        return (
          <section className={classMain}>
            {getRoutes && (
              <SubHeader
                isBack={!isUserCur}
                title={isUserCur ? getRoutes.name : queryName}
              />
            )}
            <Switch>
              {RouteConfig.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
              <Redirect to="/" />
            </Switch>
            {isAdd && isUserCur && <Menu />}
            {isBackTop && (
              <BackTop
                className="bg-transparent ft-white"
                data-layout="layout"
                data-layout-align="center center"
              >
                <svg className="svg svg-gotop">
                  <use xlinkHref="#gotop" fill="#fff" />
                </svg>
              </BackTop>
            )}
          </section>
        )
      }}
    />
  )
}
