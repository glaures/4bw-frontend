<script>
import {ref, onMounted, inject} from "vue";
import {useRoute, useRouter} from "vue-router";
import api from '../../4bw-api'

export default {
  name: "LinkedInSignUpCallback",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const error = ref(null);

    function registerUser() {
      loading.value = true;
      api.post('/callbacks/linkedin', {code: route.query.code})
          .then(res => {
            router.push({name: 'profile', params: {nameId: res.data.nameId}})
          }).catch(err => {
        console.log('error: ' + JSON.stringify(err.response.data))
      }).finally(() => loading.value = false)
    }

    onMounted(() => {
      registerUser();
    });

    return {
      loading,
      error
    };
  }
}
</script>

<template>
  <h1>Signing you up with your LinkedIn profile</h1>
  <span>{{ loading ? 'loading' : 'not loading' }}</span>
</template>

<style scoped>

</style>