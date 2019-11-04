export const state = () => ({
  data: {},
  players: [],
  seasonId: '2020'
})

export const mutations = {
  SET(state, data) {
    state.data = data
  },

  SET_PLAYERS(state, players) {
    state.players = players
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('FETCH')
  }
}
