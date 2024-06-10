<template>
  <div class="main-gradient navbar navbar-light sticky-top shadow" v-if="$route.name !== 'homepage'">
    <a class="navbar-brand" href="/">
      <img src="@/assets/img/4bw-logo.svg" alt="Logo" height="23">
    </a>
    <div v-if="!loggedIn" class="form-inline my-2 my-lg-0">
      <button class="btn btn-outline-light btn-sm my-2 my-sm-0 me-1" @click="$router.push({name: 'login'})">
        {{ $t('login') }}
      </button>
      <button class="btn btn-outline-light btn-sm my-2 my-sm-0" @click="$router.push({name: 'supplierRegistration'})">
        {{ $t('signUp') }}
      </button>
    </div>
    <div v-else>
      <div class="dropdown">
        <AdvancedImage class="rounded-circle dropdown-toggle" height="40"
                       :cld-img="$cld.image(user.profilePicture)"
                       :alt="user.givenName + ' ' + user.familyName"
                       data-bs-toggle="dropdown"/>
        <div class="dropdown-menu shadow">
          <div>
            <router-link class="dropdown-item"
                         :to="{name: 'editProfile', params: {nameId: user.nameId}}">
              {{ $t('editProfile') }}
            </router-link>
          </div>
          <div>
            <router-link class="dropdown-item"
                         :to="{name: 'publicHome', params: {nameId: user.nameId}}"
                         target="_blank">
              {{ $t('viewPublicHome') }}
            </router-link>
          </div>
          <div class="dropdown-divider"/>
          <div>
            <a class="dropdown-item" @click="logoutAndReturnToHome">
              {{ $t('logout') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {authStore} from '@/stores/auth'
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "Navigation",
  components: {AdvancedImage},
  computed: {
    ...mapState(authStore, ['loggedIn', 'user']),
  },
  methods: {
    ...mapActions(authStore, ['logout']),
    logoutAndReturnToHome() {
      this.logout().then(() => this.$router.push('/'))
    }
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
  z-index: 1;
}

.navbar-brand {
  z-index: -1;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  transform: translateX(-90%) translateY(-20%);
  z-index: -1;
}
</style>
