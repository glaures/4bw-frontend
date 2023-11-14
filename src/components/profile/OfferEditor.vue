<template>
  <form @submit:prevent="$emit('save', editedOffer)">
    <TextInput v-model="editedOffer.name" :label="$t('offerName')"/>
    <label for="#offerDescriptionEditor">{{ $t('offerDescription') }}</label>
    <QuillEditor :placeholder="$t('offerDescriptionPlaceholder')"
                 v-model:content="editedOffer.description"
                 contentType="html"/>
    <div class="text-end mt-3">
      <div class="btn btn-danger" @click="$emit('cancel')">{{ $t('cancel') }}</div>
      <div class="btn btn-primary ms-1" @click="$emit('save', editedOffer)">{{ $t('save') }}</div>
    </div>
  </form>
</template>

<script>
import TextInput from "@/components/forms/TextInput.vue";

export default {
  components: {TextInput},
  props: {
    offer: Object
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      editedOffer: {},
    }
  },
  watch: {
    offer: {
      handler(newVal, oldVal) {
        this.editedOffer = {...newVal}
      },
      immediate: true
    },
  }
}
</script>
<style scoped>
.editorWrapper {
  min-height: 180px;
  height: 180px;
  max-height: 180px;
}
</style>