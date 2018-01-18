// This is your plugin object. It can be exported to be used anywhere.
const Maker = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install (Vue, options) {
    Vue.prototype.$maker = {
      serialName (num) {
        
      }
    }
  }
}

export default Maker
