import Loadable from 'react-loadable'

const ShowLoadingComponent = props => {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div className="pdtb tc">加载超时</div>
    }
    return props.pastDelay ? <div className="pdtb tc">玩命加载中...</div> : null
  }
  return props.error ? <div>Error! Component failed to load</div> : null
}
const AsyncLoadable = opts => {
  return Loadable({
    loading: () => null, //ShowLoadingComponent,
    delay: 200,
    timeout: 1000,
    ...opts
  })
}

export default [
  {
    path: '/',
    exact: true,
    component: AsyncLoadable({
      loader: () => import('@view/home/Home')
    }),
    name: 'NodeJS论坛'
  },
  {
    path: '/index/article-details',
    component: AsyncLoadable({
      loader: () => import('@view/home/Article-Details')
    }),
    name: '详情'
  },
  {
    path: '/news',
    exact: true,
    component: AsyncLoadable({
      loader: () => import('@view/info/News')
    }),
    name: '消息'
  },
  {
    path: '/share',
    component: AsyncLoadable({
      loader: () => import('@view/pose/Issue')
    }),
    name: '分享'
  },
  {
    path: '/user',
    exact: true,
    component: AsyncLoadable({
      loader: () => import('@view/personal/Mine')
    }),
    name: '我的'
  },
  {
    path: '/user/login',
    component: AsyncLoadable({
      loader: () =>
        import('@component/common/SharedCompt').then(module => module.UserLogin)
    }),
    name: '登录'
  },
  {
    component: AsyncLoadable({
      loader: () => import('@view/NotFound')
    }),
    name: '未找到'
  }
]
