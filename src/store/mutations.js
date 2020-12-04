import * as types from './mutation-types'

const mutations = {
  [types.SET_COMPONENTS](state, comps) {
    state.components = comps
  },
  [types.SET_COMPONENT_ID](state, id) {
    state.activeComponentId = id
  }
}

export default mutations