// This is your plugin object. It can be exported to be used anywhere.
const Format = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install (Vue, options) {
    Vue.prototype.$format = {
      money (num) {
        return num.toLocaleString()
        // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    }
  }
}

export default Format
