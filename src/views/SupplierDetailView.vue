<template>
  <div class="container" v-if="user">
    <div class="d-flex justify-content-start">
      <div>
        <AdvancedImage :cld-img="$cld.image(user.profilePicture)" :height="90" :alt="user.familyName"
                       class="rounded-circle shadow"/>
      </div>
      <div class="flex-fill ms-3 ms-lg-2">
        <div class="h1">{{ user.givenName }} {{ user.familyName }}</div>
        <div class="mt-1">
          {{ user.about.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";
import AboutEditor from "@/components/profile/AboutEditor.vue";
import AddressEditor from "@/components/profile/AddressEditor.vue";
import CertificateEditor from "@/components/certification/CertificationEditor.vue";
import SocialContactsEditor from "@/components/profile/SocialContactsEditor.vue";
import OffersList from "@/components/offer/OffersList.vue";
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "SupplierDetailView",
  components: {AdvancedImage},
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
      api.get(`/users/${this.id}`, {
        params: {
          id: this.id,
          detailed: true
        }
      }).then(res => this.user = res.data)
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