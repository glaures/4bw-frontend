<template>
  <div class="h1">{{ $route.name }}</div>
  <div>
    <router-link :to="{name: 'supplierDetail'}">Suchergebnis angeklickt</router-link>
  </div>
  <div>
    <router-link :to="{name: 'plansOverview'}">Kostenpflichtigen Inhalt angeklickt</router-link>
  </div>
</template>

<script>
export default {
  name: "SearchView"
}
</script>


<style scoped>

</style>