<script>
export default {
  name: "CheckoutView"
}
</script>

<template>
  <div class="h1">{{ $route.name }}</div>
  <div>
    <router-link :to="{name: 'projectDetail'}">Projekt gewählt</router-link>
  </div>
</template>

<style scoped>

</style>