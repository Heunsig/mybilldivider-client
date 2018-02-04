export default {
  created () {
    this.tabInMixin = this.$route.params.page
  },
  data () {
    return {
      tabInMixin: null
    }
  },
  watch: {
    tabInMixin (currentTab) {
      let mainPath = (this.$route.fullPath).replace('/' + this.$route.params.page, '')
      let isHash = window.location.hash ? '#' : ''
      let changingPath = isHash + mainPath + '/' + currentTab

      // path without # any moment
      let changingPathWithoutHash = mainPath + '/' + currentTab
      window.history.pushState(null, null, changingPath)
      this.$ga.page(changingPathWithoutHash)
    }
  }
}
