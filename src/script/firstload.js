;({
  el: document.documentElement,
  init() {
    this.fontAdapt()
    window.onresize = () => this.fontAdapt()
  },
  fontAdapt() {
    const w = this.el.offsetWidth
    const fz = w / 20
    this.el.style.fontSize = (fz < 20 ? fz : 20) + 'px'
  }
}.init())
