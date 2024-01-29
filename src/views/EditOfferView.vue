<template>
  <div class="container" v-if="loggedIn">
    <div class="h1">{{ editedOffer.id ? editedOffer.name : $t('editNewOffer') }}</div>
    <OfferEditor :offer="editedOffer" @cancel="cancelEdit" @save="saveOffer"/>
  </div>
</template>

<script>
import OfferEditor from "@/components/offer/OfferEditor.vue";
import {api} from "@/4bw-api";
import {authStore} from "@/stores/auth";
import {mapState} from "pinia";
import {handleError, showInfo} from '@/utils/notifications';

export default {
  name: "EditOfferView",
  components: {OfferEditor},
  props: {
    offerId: String
  },
  data() {
    return {
      editedOffer: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState(authStore, ['user', 'loggedIn'])
  },
  methods: {
    loadOffer() {
      if (this.offerId)
        api.get(`/users/${this.user.id}/offers/${this.offerId}`)
            .then(res => this.editedOffer = res.data)
            .catch(err => handleError(err))
    },
    saveOffer(offer) {
      api.post(`/users/${this.user.id}/offers`, offer)
          .then(res => {
            showInfo(this.$t('offerSaved', [res.data.name]))
            this.$router.go(-1)
          })
          .catch(err => handleError(err))
    },
    cancelEdit() {
      this.editedOffer = {}
      this.$router.go(-1)
    }
  },
  watch: {
    loggedIn(newVal) {
      if (newVal) {
        this.loadOffer()
      }
    },
    offerId: {
      handler() {
        if (this.loggedIn)
          this.loadOffer()
      },
      immediate: true
    }
  },
}
</script>


<style scoped>

</style>