const base = {
  namespaced: true,
  state: {
    backgroundMainCss: ''
  },
  getters: {
    getBackgroundMainCss (state) {
      return state.backgroundMainCss
    }
  },
  mutations: {
    setBackgroundMainCss (state, payload) {
      state.backgroundMainCss = payload.css
    }
  }
}

export default base
