// This is your plugin object. It can be exported to be used anywhere.
const GetPosition = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install (Vue, options) {
    Vue.prototype.$getPosition = {
      scrollTop () {
        let supportPageOffset = window.pageXOffset !== undefined
        let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

        let scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

        return scrollTop
      }
    }
  }
}

export default GetPosition
