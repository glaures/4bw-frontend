<script>
export default {
  name: "SupplierRegistration"
}
</script>

<template>
  <div class="h1">{{ $route.name }}</div>
  <div>
    <router-link :to="{name: 'profile'}">Trainer registriert</router-link>
  </div>
</template>

<style scoped>

</style>