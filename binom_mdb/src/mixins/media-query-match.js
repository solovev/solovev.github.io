const widthThreshold = 1280

export default {
  created () {
    if ('matchMedia' in window) {
      this.mqListener = (e) => {
        this.isWideScreen = (e || this.mqList).matches
      }
      this.mqList = window.matchMedia(`(min-width: ${widthThreshold}px)`)
      this.mqList.addListener(this.mqListener)

      this.mqListener()
    }
  },
  destroyed () {
    if (this.mqList) {
      this.mqList.removeListener(this.mqListener)
    }
  },
  data: function () {
    return {
      isWideScreen: false
    }
  }
}
