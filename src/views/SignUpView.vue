<script>
export default {
  name: "SignUpView",
  data() {
    return {
      redirectUrl: import.meta.env.VITE_4BW_LINKEDIN_OAUTH_REDIRECT_URL
    }
  }
}
</script>

<template>
  <h1>Sign Up</h1>
  <a class="btn btn-primary"
     :href="'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=8677vx0nctt8kd&redirect_uri=' + redirectUrl + '&state=foobar&scope=openid%20profile%20email'">Sign
    up with LinkedIn</a>
</template>

<style scoped>

</style>