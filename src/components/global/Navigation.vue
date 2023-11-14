<script>
import {mapState} from "pinia";
import {authStore} from '@/stores/auth'

export default {
  name: "Navigation",
  computed: {
    ...mapState(authStore, ['loggedIn', 'user']),
  }
}
</script>

<template>
  <div class="navbar navbar-light sticky-top shadow">
    <a class="navbar-brand" href="/">
      <img src="@/assets/img/4bw-logo.svg" alt="Logo" height="32">
    </a>
    <div v-if="!loggedIn" class="form-inline my-2 my-lg-0">
      <button class="btn btn-outline-light btn-sm my-2 my-sm-0" @click="$router.push({name: 'signIn'})">
        {{ $t('signUp') }}
      </button>
    </div>
    <div v-else>
      <router-link :to="{name: 'profile', params: {nameId: user.nameId}}">
        <img class="rounded-circle shadow" height="40" :src="user.profilePicture"
             :alt="user.givenName + ' ' + user.familyName"/>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: 100vw;
  padding: 0.2rem 1.0rem;
  margin-bottom: 1.0rem;
  background-color: var(--dark-natural);
}

.navbar-brand {
}
</style>