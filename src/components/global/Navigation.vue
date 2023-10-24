<script>
import {mapState} from "pinia";
import {authStore} from '@/stores/auth'

export default {
  name: "Navigation",
  computed: {
    ...mapState(authStore, ['user', 'loggedIn'])
  }
}
</script>

<template>
    <div class="navbar navbar-light sticky-top">
      <a class="navbar-brand" href="/">4 Better Work</a>
      <div v-if="!loggedIn" class="form-inline my-2 my-lg-0">
        <button class="btn btn-outline-light btn-sm my-2 my-sm-0" @click="$router.push({name: 'signIn'})">{{$t('signUp')}}</button>
      </div>
      <div v-if="user">
        <img class="rounded-circle shadow" height="40" :src="user.profilePicture" :alt="user.givenName + ' ' + user.familyName"/>
      </div>
    </div>
</template>

<style scoped>
.navbar {
  width: 100vw;
  padding: 0.2rem 1.0rem;
  margin-bottom: 1.0rem;
  background-color: var(--light-alt);
}

.navbar-brand {
  color: var(--light-natural);
  font-family: Orson, sans-serif;
  font-size: 1.2rem;
}
</style>