<template>
  <div class="container" v-if="user">
    <div class="d-flex justify-content-start">
      <div>
        <img :src="user.profilePicture" alt="user.nameId" class="img-fluid rounded-circle shadow"/>
      </div>
      <div class="flex-fill ms-1 ms-lg-2">
        <div class="fs-3">{{ user.givenName }} {{ user.familyName }}</div>
        <div class="mt-2">
          <AboutEditor :user-id="user.id"/>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <AddressEditor :user-id="user.id"/>
    </div>
    <div class="mt-2">
      <SocialContactsEditor :user-id="user.id"/>
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
import SocialContactsEditor from "@/components/profile/SocialContactsEditor.vue";
import AboutEditor from "@/components/profile/AboutEditor.vue";

export default {
  components: {AboutEditor, SocialContactsEditor, OffersList, AddressEditor},
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