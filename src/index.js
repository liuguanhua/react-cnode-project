import { render } from 'react-dom'
import { Router, HashRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from '@store/reducer/ReducerRoot'
import history from '@script/history'
import '@script/firstload'
import '@script/reuse'
// import registerServiceWorker from './registerServiceWorker'

import App from '@view/App'
import '@assets/styles/css/global'

const store = createStore(reducers, applyMiddleware(thunk))
//Router 发布模式刷新会找不到页面，需配置服务端
const ModeRouter = Object.is(process.env.NODE_ENV, 'development')
  ? Router
  : HashRouter

render(
  <ModeRouter history={history} hashType="hashbang">
    <Provider store={store}>
      <App />
    </Provider>
  </ModeRouter>,
  document.getElementById('root')
)
// registerServiceWorker()
