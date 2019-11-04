<template>
  <div class="card">
    <header>
      <p>
        <span>{{ matchupPeriodId }}. nedēļas </span>
        <strong>rezultāti</strong>
      </p>
    </header>

    <div class="matchups">
      <div v-for="matchup in matchups" :key="matchup.id" class="matchup">
        <div class="team">
          <img :src="matchup.home.team.logo" />
          <p>
            {{ matchup.home.team.location }}
            <strong>{{ matchup.home.team.name }}</strong>
          </p>
        </div>
        <div class="score">
          {{ matchup.home.cumulativeScore.wins }}
          -
          {{ matchup.home.cumulativeScore.losses }}
        </div>
        <div class="team team--away">
          <img :src="matchup.away.team.logo" />
          <p>
            {{ matchup.away.team.location }}
            <strong>{{ matchup.away.team.name }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Team from '~/components/Team'
export default {
  computed: {
    matchupPeriodId() {
      return Number(this.$route.params.week)
    },

    teams() {
      return this.$store.getters.teams
    },

    matchups() {
      return this.$store.state.data.schedule
        .filter(match => match.matchupPeriodId === this.matchupPeriodId)
        .map(match => ({
          ...match,
          away: {
            ...match.away,
            team: this.teams.find(team => team.id === match.away.teamId)
          },
          home: {
            ...match.home,
            team: this.teams.find(team => team.id === match.home.teamId)
          }
        }))
    }
  },

  components: {
    Team
  },

  filters: {
    inWords(number) {
      const words = 'pirm,otr,treš,ceturt,piekt,sest,septīt,astot,devīt,desmit,vien,div,trīs,četr,piec,seš,septiņ,astoņ,deviņ,divdesmit'.split(",")
      const index = number - 1;

      return `${words[index]}${(index > 9 && index < 19) ? 'padmit' : ''}ās`
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 1080px;
  height: 1350px;
  background: url("/results-card.jpg") no-repeat center;
  position: relative;
}

header {
  color: #fff;
  font-style: italic;
  font-size: 64px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 295px;
  padding-left: 325px;

  p {
    display: inline-block;
    position: relative;
    padding-top: 35px;
    padding-left: 45px;
  }

  span {
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: white;
    color: transparent;
    position: absolute;
    left: 0;
    top: 0;
  }

  strong {
    font-size: 72px;
  }
}

.matchups {
  margin-left: 120px;
  width: 920px;

  .matchup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }
}

.score {
  color: white;
  font-size: 48px;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
}

.team {
  width: 420px;
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;

  p {
    color: #fff;
    font-size: 26px;
    font-weight: 500;
    line-height: 1;

    strong {
      font-size: 38px;
      font-weight: 800;
      text-transform: uppercase;
      display: block;
    }
  }

  img {
    width: 70px;
    height: auto;
    margin-right: 20px;
  }

  &--away {
    flex-direction: row-reverse;
    text-align: right;

    img {
      margin-left: 20px;
      margin-right: 0;
    }
  }
}
</style>
