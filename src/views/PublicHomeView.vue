<template>
  <div class="h1">{{ $route.name }}</div>
  <div v-if="user">
    {{ user.familyName }}
  </div>
  <div>
    <router-link to="/plans">konstenpflichtige Inhalte geklickt</router-link>
  </div>
</template>
<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";

export default {
  props: {
    nameId: String
  },
  data() {
    return {
      user: undefined
    }
  },
  methods: {
    loadUser() {
      api.get(`/users`, {params: {'nameId': this.nameId}})
          .then(res => this.user = res.data)
          .catch(err => handleError(err))
    }
  },
  watch: {
    nameId: {
      handler(newVal) {
        if (newVal)
          this.loadUser()
      },
      immediate: true
    }
  }
}
</script>
<style scoped>

</style>