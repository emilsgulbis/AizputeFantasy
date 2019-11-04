<template>
  <div class="flex items-center">
    <img class="w-10 h-10 rounded-full mr-4" :src="team.logo">
    <div class="text-sm">
      <p class="text-gray-900 leading-none">{{ team.location }} <strong>{{ team.name }}</strong></p>
      <p class="text-gray-600">{{ team.owner.firstName }} {{ team.owner.lastName }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    team: Object
  }
}
</script>
