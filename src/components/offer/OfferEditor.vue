<template xmlns="http://www.w3.org/1999/html">
    <div>
        <TextInput v-model="editedOffer.name" label="offerName"/>
        <label for="#offerDescriptionEditor">{{ $t('offerDescription') }}</label>
        <QuillEditor ref="quill"
                     :placeholder="$t('offerDescriptionPlaceholder')"
                     v-model:content="editedOffer.description"
                     contentType="html"
                     style="min-height: 30vh; max-height: 30vh; overflow: scroll;"/>
        <div class="d-flex justify-content-end mt-3">
            <div class="btn btn-danger" style="" @click="$emit('cancel')">{{ $t('cancel') }}</div>
            <div class="btn btn-primary ms-1" @click="$emit('save', editedOffer)">{{
                $t('save')
                }}
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from "@/components/forms/TextInput.vue";
import LanguageSelector from "@/components/language/LanguageSelector.vue";
import {AdvancedImage} from "@cloudinary/vue";

export default {
    components: {AdvancedImage, LanguageSelector, TextInput},
    props: {
        offer: Object
    },
    emits: ['cancel', 'save'],
    data() {
        return {
            editedOffer: {}
        }
    },
    watch: {
        offer: {
            handler(newVal) {
                this.editedOffer = {...newVal}
                if (newVal && !this.editedOffer.description)
                    this.editedOffer.description = '<p></p>'
            },
            immediate: true
        }
    }
}
</script>
