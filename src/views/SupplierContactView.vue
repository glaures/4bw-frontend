<template>
  <div class="h1">{{ $route.name }}</div>
  <div v-if="user">
    {{ user.familyName }}
  </div>
  <div>
    <router-link :to="{name: 'supplierDetail', params: {id: user?.id}}">Zurück zu {{user?.givenName}}</router-link>
  </div>
  <div>
    <router-link :to="{name: 'projectManagement'}">Zu Projekt hinzufügen</router-link>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";

export default {
  name: "SupplierDetailView",
  props: {
    id: String
  },
  data() {
    return {
      user: undefined
    }
  },
  methods: {
    loadUser() {
      api.get(`/users/${this.id}`)
          .then(res => this.user = res.data)
          .catch(err => handleError(err))
    }
  },
  watch: {
    id: {
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