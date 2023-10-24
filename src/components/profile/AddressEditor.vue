<script>
import {api} from '@/4bw-api'

const emptyAddress = {
  id: null,
  streetAndNumber: '',
  zip: '',
  city: '',
  state: '',
  country: ''
}
export default {
  name: "AddressEditor",
  props: {
    id: String,
    userId: String
  },
  data() {
    return {
      editedAddress: {...emptyAddress},
      editMode: false
    }
  },
  computed: {
    emptyAddress() {
      return !this.editedAddress?.id
    }
  },
  methods: {
    loadAddressByUserId(userId) {
      api.get(`/users/${userId}/addresses`)
          .then((res) => this.editedAddress = res.data)
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

<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-6">{{ $t('address') }}</div>
        <div v-if="!editMode" class="col-6 text-end">
          <div class="btn btn-sm btn-primary" @click="editMode = !editMode">{{ $t('edit') }}</div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="emptyAddress && !editMode">
        <div class="row text-muted  ">
          {{$t('noAddressYet')}}
        </div>
      </div>
      <div v-if="!editMode && !emptyAddress">
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
      </div>
      <div v-if="editMode">
        <div class="row">
          <label for="streetAndNumberInput">{{ $t('streetAndNumber') }}</label>
          <input id="streetAndNumberInput" class="form-control form-text" v-model="editedAddress.streetAndNumber"/>
        </div>
        <div class="row">
          <div class="col-6">{{ $t('zip') }}&nbsp;{{ $t('city') }}</div>
          <div class="col-6">{{ editedAddress.zip }}&nbsp;{{ editedAddress.city }}</div>
        </div>
        <div class="row" v-if="$i18n.locale !== 'de'">
          <div class="col-6">{{ $t('state') }}</div>
          <div class="col-6">{{ editedAddress.state }}</div>
        </div>
        <div class="row">
          <div class="col-6">{{ $t('country') }}</div>
          <div class="col-6">{{ editedAddress.country }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>