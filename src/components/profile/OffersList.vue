<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-6">{{ $t('offers') }}</div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="!noOffersYet" class="list-group">
        <div v-for="offer in offers" class="list-group-item d-flex justify-content-between">
          <div>{{ offer.name }}</div>
          <div>
            <div class="btn btn-danger btn-sm" @click="remove(offer.id)" :aria-label="$t('delete')">
              <fa-icon icon="trash-can"/>
            </div>
            <div class="btn btn-primary btn-sm ms-1" data-bs-toggle="modal" data-bs-target="#offerEditor" @click="edit(offer)" :aria-label="$t('edit')">
              <fa-icon icon="fa-pen"/>
            </div>
          </div>
        </div>
      </div>
      <div :class="{'mt-3': !noOffersYet}">
        <span class="action-link" data-bs-toggle="modal" data-bs-target="#offerEditor">
          <fa-icon icon="plus" class="me-1"/>{{ $t('newOffer') }}
        </span>
      </div>
      <OfferEditor id="offerEditor" :offer="editedOffer" @save="save($event)"/>
    </div>
  </div>
</template>

<script>
import {api} from '@/4bw-api'
import OfferEditor from "@/components/profile/OfferEditor.vue";
import {handleError, showInfo} from "@/utils/notifications";

const emptyOffer = {
  name: '',
  description: ''
}
export default {
  name: "OffersList",
  components: {OfferEditor},
  props: {
    userId: String
  },
  data() {
    return {
      offers: [],
      editedOffer: {...emptyOffer}
    }
  },
  computed: {
    noOffersYet() {
      return this.offers?.length === 0
    }
  },
  methods: {
    loadOffers() {
      api.get(`/users/${this.userId}/offers`)
          .then((res) => this.offers = res.data || [])
    },
    submit() {
      const method = this.editedOffer.id ? 'put' : 'post'
      api[method](`/users/${this.userId}/offers`, this.editedOffer)
          .then(res => {
            this.loadOffers()
          })
          .catch(err => handleError(err))
    },
    remove(offerId) {
      api.delete(`/users/${this.userId}/offers/${offerId}`)
          .then(res => {
            showInfo(this.$t('offerDeleted'))
            this.loadOffers()
          })
          .catch(err => handleError(err))
    },
    edit(offer) {
      this.editedOffer = offer
    },
    save(offer) {
      this.editedOffer = offer
      this.submit()
    }
  },
  watch: {
    userId: {
      handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal)
          this.loadOffers()
      },
      immediate: true
    }
  }
}
</script>


<style scoped>

</style>