<template>
  <div v-if="userId" class="card">
    <div class="card-header">{{ $t('socialNetworks') }}</div>
    <div class="card-body">
      <div class="input-group input-group-text mb-3" id="basic-addon1" v-for="(socialContact, idx) in socialContacts"
           :key="socialContact.id">
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" :id="'dropdown' + idx"
                  data-bs-toggle="dropdown" aria-expanded="false">
            <fa-icon v-if="socialContact.socialNetwork" :icon="'fab fa-' + socialContact.socialNetwork.faIcon"/>
            <span v-else>{{ $t('choose') }}</span>
          </button>
          <ul class="dropdown-menu px-1 w-100" :aria-labelledby="'dropdown' + idx">
            <li v-for="sn in unusedSocialNetworks" class="dropdown-item" style="cursor: pointer" href="#"
                @click="networkInput(idx, sn)">
              <fa-icon :icon="'fab fa-' + sn.faIcon"/>
              <span class="ms-1">{{ sn.name }}</span>
            </li>
          </ul>
        </div>
        <span>{{ socialContact.socialNetwork ? socialContact.socialNetwork.profileUrlPrefix : '' }}</span>
        <input :id="'accountInput_' + idx" type="text" class="form-control" v-model="socialContact.account"
               v-debounce="accountInput">
        <fa-icon icon="trash-can" class="btn btn-sm" @click="deleteContact(socialContact)"></fa-icon>
        ´
      </div>
      <div>
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

export default {
  name: "SocialContactsEditor",
  components: {TextInput},
  directives: {
    debounce: vue3Debounce({lock: true})
  },
  props: {
    userId: String
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
    addContact() {
      this.socialContacts.push({
        id: 'new' + this.socialContacts.length
      })
    },
    saveContact(socialContact) {
      console.log(socialContact)
      if (socialContact.account && socialContact.socialNetwork)
        api.post(`/users/${this.userId}/social`, socialContact)
            .then(res => this.socialContacts = res.data)
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
    accountInput(input, event) {
      const editedContact = this.socialContacts[event.target.id.split('_')[1]]
      this.saveContact(editedContact)
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