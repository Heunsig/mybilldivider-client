export default {
  created () {
    if (this.$route.params.page) {
      this.tab = this.$route.params.page
    } else {
      console.log('heror')
    }
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
