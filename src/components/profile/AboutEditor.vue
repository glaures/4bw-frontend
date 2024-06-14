<template>
  <div>
    <div class="position-relative" v-if="about">
      <div v-if="about.headline" class="blockquote-footer">{{ about.headline }}</div>
      <div v-if="about.website"><a :href="about.website">{{ about.website }}</a></div>
    </div>
    <div v-if="!readOnly">
            <span class="action-link small" data-bs-toggle="modal"
                  data-bs-target="#aboutEditorModal">{{ $t('editAbout') }}</span>
    </div>
    <div class="modal fade" tabindex="-1" id="aboutEditorModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div>
              <TextInput v-model="about.description" label="userDescription"/>
              <TextInput v-model="about.website" label="website"/>
              <TextInput v-model="about.headline" label="headline"/>
              <div class="mb-3">
                <label for="aboutTextArea" class="form-label">{{ $t('aboutMe') }}</label>
                <textarea id="aboutTextArea" rows="10" class="form-control" v-model="about.about"/>
              </div>
              <div class="text-end">
                <button class="btn btn-danger" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                <button class="btn btn-primary ms-1" data-bs-dismiss="modal"
                        @click="save">{{
                    $t('save')
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/forms/TextInput.vue";
import LanguageSelector from "@/components/language/LanguageSelector.vue";

export default {
  name: "AboutEditor",
  components: {LanguageSelector, TextInput},
  emits: ['save'],
  props: {
    value: Object,
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      about: {
        website: null,
        headline: null,
        about: null,
        languages: []
      }
    }
  },
  methods: {
    save() {
      this.$emit('save', this.about)
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal)
          this.about = newVal
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
