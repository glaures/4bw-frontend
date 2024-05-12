<script>
import TextInput from "@/components/forms/TextInput.vue";
import DateInput from "@/components/forms/DateInput.vue";

export default {
  name: "CertificateEditor",
  components: {TextInput, DateInput},
  emits: ['update:modelValue'],
  props: {
    modelValue: Object
  },
  data() {
    return {
      id: null,
      name: '',
      issuer: '',
      issuedDate: null,
      expirationDate: null
    }
  },
  methods: {
    clear() {
      this.id = null
      this.name = ''
      this.issuer = ''
      this.issuedDate = null
      this.expirationDate = null
    },
    save() {
      this.$emit('update:modelValue', {
        id: this.id,
        name: this.name,
        issuer: this.issuer,
        issuedDate: this.issuedDate,
        expirationDate: this.expirationDate
      })
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (newVal) {
          this.id = newVal.id
          this.name = newVal.name
          this.issuer = newVal.issuer
          this.issuedDate = newVal.issuedDate
          this.expirationDate = newVal.expirationDate
        } else {
          this.clear()
        }
      },
      immediate: true
    }
  }
}
</script>

<template>
  <div>
    <TextInput v-model="name" label="certificationName"/>
    <TextInput v-model="issuer" label="issuer"/>
    <DateInput v-model="issuedDate" type="month" label="issuedDate"/>
    <DateInput v-model="expirationDate" type="month" label="expirationDate"/>
    <div class="text-end">
      <button class="btn btn-danger me-1" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="save">{{ $t('save') }}</button>
    </div>
  </div>
</template>

<style scoped>

</style>