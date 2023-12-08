<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <TextInput v-model="editedOffer.name" label="offerName"/>
          <label for="#offerDescriptionEditor">{{ $t('offerDescription') }}</label>
          <QuillEditor ref="quill"
                       :placeholder="$t('offerDescriptionPlaceholder')"
                       v-model:content="editedOffer.description"
                       contentType="html"
                       style="min-height: 30vh; max-height: 30vh; overflow: scroll;"/>
          <div class="mt-3">
            <label for="#languagesSelector">{{$t('offerLanguages')}}</label>
            <LanguageSelector class="mt-1" v-model="editedOffer.languages"/>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btn btn-danger" data-bs-dismiss="modal">{{ $t('cancel') }}</div>
          <div class="btn btn-primary ms-1" data-bs-dismiss="modal" @click="$emit('save', editedOffer)">{{
              $t('save')
            }}
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
  components: {LanguageSelector, TextInput},
  props: {
    offer: Object
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      editedOffer: {}
    }
  },
  watch: {
    offer: {
      handler(newVal, oldVal) {
        this.editedOffer = {...newVal}
        if(newVal && !this.editedOffer.description)
          this.editedOffer.description = '<p></p>'
      },
      immediate: true
    },
  }
}
</script>