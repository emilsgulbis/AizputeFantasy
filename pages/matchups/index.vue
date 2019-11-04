<template>
  <div class="flex flex-wrap -mx-2">
    <div
      v-for="matchupPeriodId in matchupPeriodCount"
      :key="matchupPeriodId"
      class="w-1/8 mb-4 px-2"
    >
      <nuxt-link
        tag="div"
        :to="`/matchups/${matchupPeriodId}`"
        class="rounded shadow p-2 hover:bg-gray-100 text-center"
      >{{ matchupPeriodId }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    matchupPeriodCount() {
      return this.$store.state.data.settings.scheduleSettings.matchupPeriodCount
    }
  }
}
</script>
