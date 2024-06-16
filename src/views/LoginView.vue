<template>
  <div class="container">
    <div class="h1">{{ $t('login') }}</div>
    <div class="card mt-3">
      <form @submit.prevent="gainAuthtoken">
        <div class="card-body">
          <TextInput label="email" type="email" autocomplete="email" v-model="email" required/>
          <TextInput label="password" type="password" autocomplete="new-password" v-model="password" required/>
          <div class="mt-2 text-end">
            <button class="btn btn-primary" @click.prevent="gainAuthtoken" :disabled="!readyToLogin" type="submit">
              {{ $t('login') }}
            </button>
          </div>
        </div>
        <hr>
        <LinkedInSignIn/>
      </form>
      <div class="card-footer text-center">
        {{ $t('notAMember') }}&nbsp;<router-link :to="{name: 'supplierRegistration'}">{{ $t('register') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/forms/TextInput.vue";
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";
import {mapActions} from "pinia";
import {authStore} from "@/stores/auth";
import LinkedInSignIn from "@/components/linkedin/LinkedInSignIn.vue";

export default {
  name: "LoginView",
  components: {LinkedInSignIn, TextInput},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    readyToLogin() {
      return this.email && this.password
    }
  },
  methods: {
    ...mapActions(authStore, ['login']),
    async gainAuthtoken() {
      const authtoken = await api.post('/login', {
        email: this.email,
        password: this.password
      }).then(res => res.data.authtoken)
          .catch(err => handleError(err))
      if (authtoken) {
        const user = await this.login(authtoken)
        this.$router.push({
          name: 'editProfile',
          params: {
            nameId: user.nameId
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>