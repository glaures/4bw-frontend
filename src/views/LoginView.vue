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
        <div class="d-flex justify-content-center mb-4 pe-5">
          <a class="btn btn-outline-primary"
             :href="'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=8677vx0nctt8kd&redirect_uri=' + redirectUrl + '&state=foobar&scope=openid%20profile%20email'">
            <AdvancedImage :cld-img="linkedInIcon" :height="30"/>
            <span class="ms-2">{{ $t('signInWithLinkedIn') }}</span>
          </a>
        </div>
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
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "LoginView",
  components: {AdvancedImage, TextInput},
  data() {
    return {
      email: '',
      password: '',
      redirectUrl: import.meta.env.VITE_4BW_LINKEDIN_OAUTH_REDIRECT_URL,
      linkedInIcon: this.$cld.image('web/linkedin_icon')
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