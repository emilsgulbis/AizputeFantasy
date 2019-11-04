import get from 'lodash/get'

export default {
  teams(state) {
    return state.data.teams.map(team => ({
      id: team.id,
      abbrev: team.abbrev,
      location: team.location,
      name: team.nickname,
      logo: team.logo,
      team: team.divisionId,
      owner: state.data.members.
        find(member => member.id === team.primaryOwner),
      picks: get(state.data, 'draftDetail.picks', [])
        .filter(pick => pick.teamId == team.id)
    }))
  }
}
