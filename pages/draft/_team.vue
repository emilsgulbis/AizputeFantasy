<template>
  <div class="card" v-if="team">
    <div
      class="photo"
      :style="{backgroundImage: `url(/draft/${firstPick.id}.jpg)`}"
    ></div>
    <div class="overlay">
      <img src="/draft-card.png" alt="Draft card">
    </div>

    <div class="info">
      <div class="header">
        <div class="team">
          <img :src="team.logo" :alt="team.name" class="logo">
          <div class="name">
            <p>{{team.name}}</p>
              <p class="location">{{team.location}}</p>
          </div>
        </div>
      </div>

      <div class="players">
        <div v-for="pick in picks" :key="pick.id" class="player">
          <p>{{ pick.fullName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Team from '~/components/Team'

export default {
  asyncData({ store }) {
    return store.dispatch('FETCH_PLAYERS')
  },

  computed: {
    teamID() {
      return Number(this.$route.params.team)
    },

    team() {
      return this.$store.getters.teams
        .find(team => team.id === this.teamID)
    },

    players() {
      return this.$store.state.players
    },

    picks() {
      return this.team.picks
        .map(pick => {
          return this.players.find(player => player.id === pick.playerId)
        })
    },

    firstPick() {
      return this.picks[0]
    }
  },

  components: {
    Team
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 1080px;
  height: 1920px;
  position: relative;

  .overlay {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }

  .photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 350px;
    height: 100%;
    z-index: 1;

    background-color: #333;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background .25s;

    &:hover {
      background-color: #555
    }
  }

  .info {
    position: absolute;
    width: 726px;
    right: 0;
    z-index: 3;
  }

  .header {
    width: 100%;
    height: 493px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .team {
    .logo {
      max-width: 150px;
      height: auto;
      margin:20px auto;
    }

    .name {
      position: relative;
      padding-top: 20px;
      padding-left: 45px;
      font-size: 100px;
      font-weight: 800;
      color: #fff;
      text-align: center;

      .location {
        font-size: 65px;
        color: transparent;
        text-align: left;
        position: absolute;
        left: 0;
        top: 0;
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: white;
      }
    }
  }

  .players {
    .player {
      height: 90px;
      margin-bottom: 5px;
      line-height: 95px;
      padding-left: 35px;
      color: #fff;

      font-size: 48px;
      font-weight: 700;
      text-shadow: 2px 2px 6px rgba(black, 1);

      &:nth-child(n+3) {
        font-weight: 600;
        font-size: 40px;
      }

      &:nth-child(n+6) {
        font-weight: 500;
        font-size: 36px;
      }
    }
  }
}
</style>
