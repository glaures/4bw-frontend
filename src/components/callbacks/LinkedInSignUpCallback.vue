<template>
  <h1>Signing you up with your LinkedIn profile</h1>
  <span>{{ loading ? 'loading' : 'not loading' }}</span>
</template>

<script>
import {api} from '@/4bw-api'
import {authStore} from "@/stores/auth";
import {mapActions, mapState} from "pinia";
import {handleError} from '@/utils/notifications';

export default {
  name: "LinkedInSignUpCallback",

  data() {
    return {
      loading: true,
      error: undefined
    }
  },
  computed: {
    ...mapState(authStore, ['user'])
  },
  methods: {
    ...mapActions(authStore, ['login']),
    signInUser() {
      this.loading = true;
      api.post('/callbacks/linkedin', {code: this.$route.query.code})
          .then(res => {
            const authtoken = res.data
            this.login(authtoken.id)
          })
          .catch(err => handleError(err))
          .finally(() => this.loading = false)
    }
  },
  watch: {
    user(newVal, oldVal) {
      if (newVal?.nameId) {
        this.$router.push({name: 'profile', params: {nameId: newVal.nameId}})
      }
    }
  },
  mounted() {
    this.signInUser();
  }
}
</script>

<style scoped>

</style>