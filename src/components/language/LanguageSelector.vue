<template>
  <div>
    <div class="row">
      <div v-for="(l, idx) in availableLanguages" :key="l.id" class="col-md-6 col-3 me-3 mb-1">
        <input class="form-check-input me-1" type="checkbox" @click="select(l, $event)" :checked="checkStates[idx]"
               :selected="checkStates[idx]"/>
        <AdvancedImage :cld-img="$cld.image('web/languages/' + l.iso)" height="23" class="me-1"/>
        <span class="form-check-label">{{ $t('language_' + l.iso) }}</span>
      </div>
    </div>
    <div class="d-flex mt-3 justify-content-end">
      <button class="btn btn-primary" data-bs-dismiss="modal">{{ $t('ok') }}</button>
    </div>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "LanguageSelector",
  components: {AdvancedImage},
  emits: ['update:modelValue'],
  props: {
    modelValue: Array
  },
  data() {
    return {
      availableLanguages: [],
      checkStates: []
    }
  },
  computed: {
    initialized(){
      return this.modelValue && this.availableLanguages
    }
  },
  methods: {
    loadAvailableLanguages() {
      api.get('/configuration/languages')
          .then(res => {
            this.availableLanguages = res.data
            this.updateCheckStates()
          })
          .catch(err => handleError(err))
    },
    select(language, event) {
      this.checkStates[this.availableLanguages.indexOf(language)] = event.target.checked
      this.$emit('update:modelValue', this.availableLanguages
          .filter(al => this.checkStates[this.availableLanguages.indexOf(al)] === true)
          .map(l => l.iso))

    },
    updateCheckStates() {
      if (this.initialized)
        this.checkStates = this.availableLanguages.map(al => this.modelValue.find(l => l === al.iso) !== undefined)
    }
  },
  watch: {
    modelValue() {
      this.updateCheckStates()
    }
  },
  mounted() {
    this.loadAvailableLanguages();
  }
}
</script>


<style scoped>

</style>