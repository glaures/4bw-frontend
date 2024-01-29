<template>
  <div class="main-gradient navbar navbar-light sticky-top shadow" v-if="$route.name !== 'homepage'">
    <a class="navbar-brand" href="/">
      <img src="@/assets/img/4bw-logo.svg" alt="Logo" height="23">
    </a>
    <div v-if="!loggedIn" class="form-inline my-2 my-lg-0">
      <button class="btn btn-outline-light btn-sm my-2 my-sm-0" @click="$router.push({name: 'signIn'})">
        {{ $t('signUp') }}
      </button>
    </div>
    <div v-else>
      <router-link :to="{name: 'profile', params: {nameId: user.nameId}}">
        <AdvancedImage class="rounded-circle shadow" height="40" :cld-img="$cld.image(user.profilePicture)"
             :alt="user.givenName + ' ' + user.familyName"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {authStore} from '@/stores/auth'
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "Navigation",
  components: {AdvancedImage},
  computed: {
    ...mapState(authStore, ['loggedIn', 'user']),
  }
}
</script>

<style scoped>
.navbar {
  width: 100vw;
  height: 90px;
  padding: 0.2rem 1.0rem;
  margin-bottom: 1.0rem;
  background-color: var(--dark);
}

.navbar-brand {
}
</style>