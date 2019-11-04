<template>
  <div class="flex flex-wrap -mx-2">
    <div
      v-for="team in teams"
      :key="team.id"
      class="w-1/4 mb-4 px-2"
    >
      <nuxt-link
        tag="div"
        :to="`/draft/${team.id}`"
        class="rounded shadow p-2 hover:bg-gray-100"
      >
        <team :team="team" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Team from '~/components/Team'

export default {
  components: {
    Team
  },

  computed: {
    teams() {
      return this.$store.getters.teams
    }
  }
}
</script>
