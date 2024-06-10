<template>
  <div class="container">
    <div class="h1">{{ $t('supplierRegistrationHeading') }}</div>
    <form @submit.prevent="register">
      <div class="mt-5">
        <TextInput label="givenName" v-model="givenName" autocomplete="given-name" :required="true"/>
        <TextInput label="familyName" v-model="familyName" autocomplete="family-name" :required="true"/>
        <TextInput label="email" type="email" autocomplete="email" v-model="email" :required="true"/>
        <TextInput label="password" type="password" autocomplete="new-password" v-model="password" :required="true"/>
      </div>
      <div class="text-end mt-3">
        <button class="btn btn-primary" type="submit" @submit.prevent="register">{{ $t('register') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError, showInfo} from "@/utils/notifications";

import TextInput from "@/components/forms/TextInput.vue";
import {mapActions, mapState} from "pinia";
import {authStore} from "@/stores/auth";

export default {
  name: "SupplierRegistration",
  components: {TextInput},
  data() {
    return {
      givenName: '',
      familyName: '',
      password: '',
      email: ''
    }
  },
  methods: {
    ...mapActions(authStore, ['login', 'logout']),
    register() {
      this.logout()
      api.post('/users', {
        email: this.email,
        password: this.password,
        givenName: this.givenName,
        familyName: this.familyName
      }).then(res => {
        this.$router.push({name: 'login'})
        showInfo(this.$t('accountCreatedPleaseLogin'))
      }).catch(err => handleError(err))
    }
  }
}
</script>


<style scoped>

</style>
