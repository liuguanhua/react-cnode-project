import { Route } from 'react-router-dom'
import '@fonts/svg/goback.svg'
const SubHeader = props => (
  <Route
    render={({ location, match, history }) => {
      const arrPathName = ['/share', '/', '/news', '/user']
      const isDefaultPath = arrPathName.includes(location.pathname)
      return (
        <header
          className="pf w100 tl0 bg-color ft-white header-bar z1"
          data-layout-align="space-between center"
          data-layout="layout"
        >
          {(!isDefaultPath || props.isBack) && (
            <svg className="svg svg-goback" onClick={history.goBack}>
              <use xlinkHref="#goback" fill="#fff" />
            </svg>
          )}
          {props.children}
          <h2 className="w100 tc header-bar-title ft-white">
            <span className={!isDefaultPath ? ' header-bar-antimg' : ''}>
              {props.title}
            </span>
          </h2>
        </header>
      )
    }}
  />
)
SubHeader.defaultProps = {
  title: '默认标题',
  isBack: false
}
export default SubHeader
