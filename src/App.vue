<script setup>
import {RouterView} from 'vue-router'
import Navigation from "@/components/global/Navigation.vue";
</script>

<template>
  <header class="sticky-top">
    <Navigation/>
  </header>
  <div class="container">
    <RouterView/>
  </div>
</template>

<script>
import {mapActions} from "pinia";
import {authStore} from "@/stores/auth";
import {getAuthtoken, clearAuthtoken} from "@/4bw-api";
import {handleError} from "@/utils/notifications";

export default {
  methods: {
    ...mapActions(authStore, ['login'])
  },
  mounted() {
    const localStorageAuthtoken = getAuthtoken()
    if (localStorageAuthtoken) {
      this.login(localStorageAuthtoken)
          .catch(err => handleError(err))
    }
  }
}
</script>

