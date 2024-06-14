<template>
  <div v-if="userId" class="card">
    <div class="card-header">{{ $t('socialNetworks') }}</div>
    <div class="card-body">
      <div class="input-group mb-3" v-for="(socialContact, idx) in socialContacts"
           :key="socialContact.id">
        <div class="dropdown col-2 mt-auto text-end">
          <button class="btn h-100 dropdown-toggle" type="button" :id="'dropdown' + idx"
                  data-bs-toggle="dropdown" aria-expanded="false">
            <fa-icon v-if="socialContact.socialNetwork" :icon="'fab fa-' + socialContact.socialNetwork.faIcon"
                     size="lg"/>
            <fa-icon v-else class="text-muted" icon="question" size="lg">{{ $t('choose') }}</fa-icon>
          </button>
          <ul class="dropdown-menu px-1 w-100" :aria-labelledby="'dropdown' + idx">
            <li v-for="sn in unusedSocialNetworks" class="dropdown-item" style="cursor: pointer" href="#"
                @click="networkInput(idx, sn)">
              <fa-icon :icon="'fab fa-' + sn.faIcon"/>
              <span class="ms-1">{{ sn.name }}</span>
            </li>
          </ul>
        </div>
        <div class="col-8">
          <label :for="'#accountInput_' + idx" class="text-muted small">{{
              socialContact.socialNetwork ? socialContact.socialNetwork.profileUrlPrefix : ''
            }}</label>
          <div class="d-flex">
            <input :id="'accountInput_' + idx" type="text" class="form-control" v-model="socialContact.account"/>
          </div>
        </div>
        <div class="col-2 mt-auto ps-1 d-flex">
          <div class="btn btn-danger btn-sm">
            <fa-icon icon="trash-can" @click="deleteContact(socialContact)"/>
          </div>
          <div class="btn btn-primary btn-sm ms-1">
            <fa-icon icon="check" @click="saveContact(socialContact)"/>
          </div>
        </div>
      </div>
      <div v-if="!readOnly">
        <span class="action-link" @click="addContact"><fa-icon icon="fa-plus"
                                                               class="me-1"/>{{ $t('addProfile') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError, showInfo} from "@/utils/notifications";
import TextInput from "@/components/forms/TextInput.vue";
import {vue3Debounce} from "vue-debounce";
import {read} from "@popperjs/core";

export default {
  name: "SocialContactsEditor",
  components: {TextInput},
  directives: {
    debounce: vue3Debounce({lock: false})
  },
  props: {
    userId: String,
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      socialNetworks: [],
      socialContacts: []
    }
  },
  computed: {
    unusedSocialNetworks() {
      return this.socialNetworks.filter(n => !this.socialContacts.find(c => c.socialNetwork?.id === n.id))
    }
  },
  methods: {
    read() {
      return read
    },
    addContact() {
      this.socialContacts.push({
        id: 'new' + this.socialContacts.length
      })
    },
    saveContact(socialContact) {
      if (socialContact.account && socialContact.socialNetwork)
        api.post(`/users/${this.userId}/social`, socialContact)
            .then(res => {
              this.socialContacts = res.data
              showInfo(this.$t(`socialContactSaved`, [socialContact.socialNetwork.name]))
            })
            .catch(err => handleError(err))
    },
    deleteContact(socialContact) {
      const socialNetworkName = socialContact.socialNetwork.name
      api.delete(`/users/${this.userId}/social/${socialContact.id}`)
          .then(res => {
            this.socialContacts = res.data
            showInfo(this.$t('socialContactDeleted', [socialNetworkName]))
          }).catch(err => handleError(err))
    },
    networkInput(idx, n) {
      this.socialContacts[idx].socialNetwork = n
      this.saveContact(this.socialContacts[idx])
    },
    loadSocialNetworks() {
      api.get(`/configuration/socialnetworks`)
          .then(res => {
            this.socialNetworks = res.data
          })
          .catch(err => handleError(err))
    },
    loadSocialContacts() {
      api.get(`/users/${this.userId}/social`)
          .then(res => this.socialContacts = res.data)
          .catch(err => handleError(err))
    }
  },
  watch: {
    userId: {
      handler(newVal) {
        this.loadSocialContacts()
      },
      immediate: true
    }
  },
  mounted() {
    this.loadSocialNetworks()
  }
}
</script>

<style scoped>

</style>