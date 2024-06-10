<script setup>
import {RouterView} from 'vue-router'
import Navigation from "@/components/global/Navigation.vue";
import LoadingSpinner from "@/components/global/LoadingSpinner.vue";
</script>

<template>
  <header v-if="$route.name !== 'publicHome'" class="sticky-top">
    <Navigation/>
  </header>
  <div>
    <LoadingSpinner :loading="loading" :message="message"/>
    <RouterView/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "pinia";
import {authStore} from "@/stores/auth";
import {getAuthtoken, clearAuthtoken} from "@/4bw-api";
import {handleError} from "@/utils/notifications";
import {loadingStore} from "@/stores/loading";

export default {
  computed: {
    ...mapState(loadingStore, ['loading', 'message'])
  },
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

