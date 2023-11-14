<script setup>
import {RouterView} from 'vue-router'
import Navigation from "@/components/global/Navigation.vue";
</script>

<template>
  <header>
    <Navigation/>
  </header>
  <RouterView/>
</template>

<script>
import {mapActions} from "pinia";
import {authStore} from "@/stores/auth";
import {getAuthtoken, clearAuthtoken} from "@/4bw-api";

export default {
  methods: {
    ...mapActions(authStore, ['login'])
  },
  mounted(){
    const localStorageAuthtoken = getAuthtoken()
    if(localStorageAuthtoken) {
      this.login(localStorageAuthtoken)
          .catch(clearAuthtoken)
    }
  }
}
</script>

