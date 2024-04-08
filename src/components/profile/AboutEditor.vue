<template>
  <div>
    <div class="position-relative" v-if="about">
      <div v-if="about.headline" class="blockquote-footer">{{ about.headline }}</div>
      <div v-if="about.website"><a :href="about.website">{{ about.website }}</a></div>
    </div>
    <div>
      <span class="action-link small" data-bs-toggle="modal" data-bs-target="#aboutEditorModal">{{$t('editAbout')}}</span>
    </div>
    <div class="modal fade" tabindex="-1" id="aboutEditorModal">>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div>
              <TextInput v-model="about.description" label="userDescription"/>
              <TextInput v-model="about.website" label="website"/>
              <TextInput v-model="about.headline" label="headline"/>
              <div>
                <label for="#languagesSelectorModel">{{ $t('offerLanguages') }}</label>
                <div class="d-flex">
                  <div v-for="l in about.languages"
                       :key="about.id + '_' + l.iso">
                    <AdvancedImage :cld-img="$cld.image('web/languages/' + l.iso)" height="16" class="me-1"/>
                  </div>
                  <div data-bs-toggle="modal" data-bs-target="#languageSelectorModal">
                    <span class="action-link">+</span>
                  </div>
                </div>
                <div id="languageSelectorModal" class="modal fade" tabindex="-1">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        <LanguageSelector class="mt-1" v-model="about.languages"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="aboutTextArea" class="form-label">{{ $t('aboutMe') }}</label>
                <textarea id="aboutTextArea" rows="10" class="form-control" v-model="about.about"/>
              </div>
              <div class="text-end">
                <button class="btn btn-danger" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                <button class="btn btn-primary ms-1" data-bs-dismiss="modal" @click="save">{{ $t('save') }}</button>
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
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";
import LanguageSelector from "@/components/language/LanguageSelector.vue";

export default {
  name: "AboutEditor",
  components: {LanguageSelector, TextInput},
  props: {
    userId: String
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
      api.post(`/users/${this.userId}/about`, this.about)
          .then(res => this.about = res.data)
          .catch(err => handleError(err))
    }
  },
  watch: {
    userId: {
      handler(newVal) {
        if (newVal)
          api.get(`/users/${this.userId}/about`)
              .then(res => this.about = res.data || {})
              .catch(err => handleError(err))
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>