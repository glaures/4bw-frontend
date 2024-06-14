<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-6">{{ $t('contact') }}</div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="isEmpty && !readOnly" class="row text-muted" >
        <div class="col">
          <span class="action-link" data-bs-toggle="modal" data-bs-target="#addressEditorModal"><fa-icon icon="plus"
                                                                                                         class="me-1"/>{{
              $t('addContactInformation')
            }}</span>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12">{{ editedAddress.email }}</div>
        </div>
        <div class="row">
          <div class="col-12">{{ editedAddress.phone }}</div>
        </div>
        <div class="row">
          <div class="col-12">{{ editedAddress.streetAndNumber }}</div>
        </div>
        <div class="row">
          <div class="col-12">{{ editedAddress.zip }}&nbsp;{{ editedAddress.city }}</div>
        </div>
        <div class="row" v-if="$i18n.locale !== 'de'">
          <div class="col-12">{{ editedAddress.state }}</div>
        </div>
        <div class="row">
          <div class="col-12">{{ editedAddress.country }}</div>
        </div>
        <span v-if="!readOnly" class="action-link small" data-bs-toggle="modal" data-bs-target="#addressEditorModal">{{
            $t('edit')
          }}</span>
      </div>
      <div class="modal fade" tabindex="-1" id="addressEditorModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <TextInput v-model="editedAddress.email" label="email" type="email"
                         autocomplete="email"/>
              <TextInput v-model="editedAddress.phone" label="phone" type="tel"
                         autocomplete="tel"/>
              <TextInput v-model="editedAddress.streetAndNumber" label="streetAndNumber"
                         autocomplete="street-address"/>
              <div class="d-flex">
                <TextInput class="pe-2" v-model="editedAddress.zip" label="zip"
                           autocomplete="postal-code"/>
                <TextInput v-model="editedAddress.city" label="city" class="flex-fill"
                           autocomplete="address-level2"/>
              </div>
              <TextInput v-model="editedAddress.country" label="country"/>
            </div>
            <div class="modal-footer">
              <div class="btn btn-danger me-1" data-bs-dismiss="modal">{{ $t('cancel') }}</div>
              <button class="btn btn-primary" data-bs-dismiss="modal" @click="submit">{{ $t('save') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from '@/4bw-api'
import TextInput from "@/components/forms/TextInput.vue";
import {handleError, showInfo} from "@/utils/notifications"
import {Form} from "vee-validate"

const emptyAddress = {
  id: null,
  phone: '',
  streetAndNumber: '',
  zip: '',
  city: '',
  state: '',
  country: '',
  email: ''
}
export default {
  name: "AddressEditor",
  components: {TextInput, Form},
  props: {
    id: String,
    userId: String,
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editedAddress: {...emptyAddress},
      editMode: false
    }
  },
  computed: {
    isEmpty() {
      return !this.editedAddress?.id
    }
  },
  methods: {
    loadAddressByUserId(userId) {
      api.get(`/users/${this.userId}/addresses`)
          .then((res) => this.editedAddress = res.data || emptyAddress)
    },
    submit() {
      api.post(`/users/${this.userId}/addresses`, this.editedAddress)
          .then(res => {
            this.editedAddress = res.data
            this.editMode = false
            showInfo(this.$t("contactInfoSaved"))
          })
          .catch(err => handleError(err))
    }
  },
  watch: {
    userId: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal)
          this.loadAddressByUserId(newVal)
      },
      immediate: true
    }
  }
}
</script>


<style scoped>

</style>