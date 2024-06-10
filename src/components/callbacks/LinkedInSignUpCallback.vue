<template>
  <div class="container">
  </div>
</template>

<script>
import {api} from '@/4bw-api'
import {authStore} from "@/stores/auth";
import {mapActions, mapState} from "pinia";
import {handleError} from '@/utils/notifications';
import {loadingStore} from "@/stores/loading";

export default {
  name: "LinkedInSignUpCallback",
  computed: {
    ...mapState(authStore, ['user'])
  },
  methods: {
    ...mapActions(authStore, ['login']),
    ...mapActions(loadingStore, ['setLoading']),
    signInUser() {
      this.setLoading(true, this.$t('linkedInSignUp'));
      api.post('/callbacks/linkedin', {code: this.$route.query.code})
          .then(res => {
            const authtoken = res.data
            this.login(authtoken)
          })
          .catch(err => handleError(err))
          .finally(() =>
              this.setLoading(false))
    }
  },
  watch: {
    user(newVal, oldVal) {
      if (newVal?.nameId) {
        this.$router.push({name: 'home'})
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