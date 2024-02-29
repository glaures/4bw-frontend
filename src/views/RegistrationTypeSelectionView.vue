<script>
export default {
  name: "RegistrationTypeSelectionView"
}
</script>

<template>
  <div class="h1">{{ $route.name }}</div>
  <div>
    <router-link to="/registration/company">Company Registration selected</router-link>
  </div>
  <div>
    <router-link to="/registration/supplier">Supplier Registration selected</router-link>
  </div>
</template>

<style scoped>

</style>