<template>
  <div class="container" v-if="user">
    <img :src="user.profilePicture" alt="user.nameId"/>
    <div class="h1">{{ user.givenName }} {{ user.familyName }}</div>
    <div>
      <AddressEditor :user-id="user.id"/>
    </div>
    <div class="mt-3">
      <OffersList :user-id="user.id"/>
    </div>
  </div>
</template>

<script>
import {api} from '@/4bw-api'
import {handleError} from "@/utils/notifications";
import AddressEditor from "@/components/profile/AddressEditor.vue";
import OffersList from "@/components/profile/OffersList.vue";

export default {
  components: {OffersList, AddressEditor},
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
          .catch(err => handleError(err))
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