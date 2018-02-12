const base = {
  namespaced: true,
  state: {
    backgroundMainCss: '',
    permissionToSeeResult: false
  },
  getters: {
    getBackgroundMainCss (state) {
      return state.backgroundMainCss
    },
    getPermissionToSeeResult (state) {
      return state.permissionToSeeResult
    }
  },
  mutations: {
    setBackgroundMainCss (state, payload) {
      state.backgroundMainCss = payload.css
    },
    setPermissionToSeeResult (state, payload) {
      state.permissionToSeeResult = payload.bool
    }
  }
}

export default base
