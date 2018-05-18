import { Link } from 'react-router-dom'
import '@fonts/svg/notfound.svg'
export default () => {
  return (
    <div className="tc">
      <svg className="svg svg-notfound w100">
        <use xlinkHref="#notfound" fill="red" />
      </svg>
      您找的页面到了火星，送我<Link
        className="ft-color"
        style={{ borderBottom: '1px solid #639', fontSize: '1rem' }}
        to="/"
      >
        回地球!
      </Link>
    </div>
  )
}
