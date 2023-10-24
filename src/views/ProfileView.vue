<template>
  <div v-if="user">
    <img :src="user.profilePicture" alt="user.nameId"/>
    <div class="h1">{{ user.givenName }} {{ user.familyName }}</div>
    <div class="row">
      <AddressEditor :user-id="user.id"/>
    </div>
  </div>
</template>

<script>
import {api} from '@/4bw-api'
import AddressEditor from "@/components/profile/AddressEditor.vue";

export default {
  components: {AddressEditor},
  props: {
    nameId: String
  },
  data() {
    return {
      user: null
    }
  },
  methods: {
    loadUser() {
      api.get(`profiles/${this.nameId}`)
          .then(res => this.user = res.data)
          .catch(err => console.log('err: ' + err.response.data))
    }
  },
  activated() {
    this.loadUser()
  },
  mounted() {
    this.loadUser()
  }
}
</script>


<style scoped>

</style>