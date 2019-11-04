import qs from 'qs'

export default {
  async FETCH({ commit, state }) {
    const result = await this.$axios.$get(
      `games/fba/seasons/${state.seasonId}/segments/0/leagues/231496`,
      {
        params: {
          view: [
            'modular',
            'mNav',
            'mMatchupScore',
            'mScoreboard',
            'mStatus',
            'mSettings',
            'mTeam',
            'mPendingTransactions',
            'mDraftDetail'
          ]
        },

        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }
    )
    commit('SET', result)
  },

  async FETCH_PLAYERS({ commit, state }) {
    const result = await this.$axios.$get(`games/fba/seasons/${state.seasonId}/players`, {
      params: {
        scoringPeriodId: 0,
        view: 'players_wl'
      }
    })

    commit('SET_PLAYERS', result)
  }
}
