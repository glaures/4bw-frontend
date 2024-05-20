<template>
  <div>
    <div class="d-flex">
      <div v-for="language in selectedLanguages"
           :key="'selected' + language.id"
           class="badge bg-primary me-1 mb-1"
           @click="deselectLanguage(language)">
        {{ language[userLanguage] }}
        <font-awesome-icon class="ms-2" icon="fa-xmark"/>
      </div>
    </div>
    <div class="mt-3">
      <input list="languages"
             v-model="filter"
             class="form-control"
             :placeholder="$t('languageSelectorPlaceholder')"
             @input="checkDatalistSelection"
             @keydown.enter="selectLanguage"/>
      <datalist id="languages">
        <option :id="language.id"
                v-for="language in filteredLanguages"
                :key="language.id"
                :value="language[userLanguage]"/>
      </datalist>
    </div>
    <div class="d-flex mt-3 justify-content-end">
      <button class="ms-1 btn btn-sm btn-primary" @click="$emit('update:modelValue', selectedLanguages)"
              data-bs-dismiss="modal">
        {{ $t('ok') }}
      </button>
    </div>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getUserLanguage} from "@/utils/user-language";

export default {
  name: "LanguageSelector",
  components: {FontAwesomeIcon},
  emits: ['update:modelValue'],
  props: {
    modelValue: Array
  },
  data() {
    return {
      selectedLanguages: [],
      filter: '',
      filteredLanguages: []
    }
  },
  computed: {
    userLanguage() {
      return getUserLanguage()
    },
  },
  methods: {
    updateLanguageList() {
      api.get('/configuration/languages', {
        params: {
          filter: this.filter
        }
      }).then(res => {
        this.filteredLanguages = res.data
      }).catch(err => handleError(err))
    },
    checkDatalistSelection(e) {
      let id = e.target.attributes['id'];
      console.log(id + ' selected')
      this.selectLanguage(id);
    },
    selectLanguage() {
      const selectedLanguage = this.filteredLanguages.find(l => l[this.userLanguage] === this.filter)
      console.log(this.filter + ": " + selectedLanguage + ' selected 2')
      if (selectedLanguage) {
        this.selectedLanguages.push(selectedLanguage)
        this.filter = ''
      } else
        this.updateLanguageList()
    },
    deselectLanguage(language){
      this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1)
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (newVal)
          this.selectedLanguages = newVal
      },
      immediate: true
    }
  },
}
</script>


<style scoped>

</style>
