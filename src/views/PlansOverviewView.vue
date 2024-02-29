<script>
export default {
  name: "PlansOverviewView"
}
</script>

<template>
  <div class="h1">{{ $route.name }}</div>
  <div>
    <router-link to="/checkout">Plan selected</router-link>
  </div>
</template>

<style scoped>

</style>