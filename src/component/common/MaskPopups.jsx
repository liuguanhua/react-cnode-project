export default class MaskPopups extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPopups: false
    }
  }
  deterMine() {
    this.props.SendDeterMine()
  }
  cancelRun() {
    this.props.SendCancelRun()
  }
  render() {
    return (
      <div className="mask-layer">
        <div className="tab-wrap">
          <div className="tab-wrap-cell">
            <div className="confirm-popups tc">
              <h2 className="confirm-title">{this.props.title}</h2>
              <div
                className="confirm-btn"
                data-layout-align="space-between center"
                data-layout="layout"
              >
                <button
                  onClick={this.cancelRun.bind(this)}
                  className="confirm-btn-no"
                >
                  取消
                </button>
                <button
                  onClick={this.deterMine.bind(this)}
                  className="confirm-btn-yes"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MaskPopups.defaultProps = {
  title: '默认弹窗标题',
  SendCancelRun: () => {},
  SendDeterMine: () => {}
}
