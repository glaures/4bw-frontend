<template>
  <div class="input-group d-flex">
    <div v-for="(l, idx) in availableLanguages" :key="l.id" class="me-3 mb-1">
      <input class="form-check-inline" type="checkbox" @click="select(l, $event)" :checked="checkStates[idx]"/>
      <AdvancedImage :cld-img="$cld.image('web/languages/' + l.iso)" height="23"/>
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
  computed: {},
  methods: {
    loadAvailableLanguages() {
      api.get('/configuration/languages')
          .then(res => {
            this.availableLanguages = res.data
          })
          .catch(err => handleError(err))
    },
    select(language, event) {
      this.checkStates[this.availableLanguages.indexOf(language)] = event.target.checked
      this.$emit('update:modelValue', this.availableLanguages
          .filter(al => this.checkStates[this.availableLanguages.indexOf(al)] === true))
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (newVal)
          this.checkStates = this.availableLanguages.map(al => newVal.find(l => l.id === al.id) !== undefined)
      },
      immediate: true
    }
  },
  mounted() {
    this.loadAvailableLanguages();
  }
}
</script>


<style scoped>

</style>