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
import {authStore} from "@/stores/auth";
import {getAuthtoken} from "@/4bw-api";
import {mapActions} from "pinia";

export default {
  methods: {
    ...mapActions(authStore, ['login'])
  },
  mounted(){
    const localStorageAuthtoken = getAuthtoken()
    if(localStorageAuthtoken)
      this.login(localStorageAuthtoken)
  }
}
</script>

