<template>
  <div class="d-flex justify-content-center mb-4 pe-5">
    <a class="btn btn-outline-primary"
       :href="'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=8677vx0nctt8kd&redirect_uri=' + redirectUrl + '&state=foobar&scope=openid%20profile%20email'">
      <AdvancedImage :cld-img="linkedInIcon" :height="30"/>
      <span class="ms-2">{{ $t('signInWithLinkedIn') }}</span>
    </a>
  </div>
</template>

<script>
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "LinkedInSignIn",
  components: {AdvancedImage},
  data() {
    return {
      redirectUrl: import.meta.env.VITE_4BW_LINKEDIN_OAUTH_REDIRECT_URL,
      linkedInIcon: this.$cld.image('web/linkedin_icon')
    }
  }
}
</script>

<style scoped>

</style>