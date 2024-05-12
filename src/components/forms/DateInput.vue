<template>
  <div v-bind="$attrs" class="mb-3">
    <label :for="inputId" class="form-label">{{ $t(label) }}</label>
    <input :type="type" :id="inputId" :name="inputId" class="form-control" :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"/>
  </div>
</template>

<script>

export default {
  name: "DateInput",
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: "date"
    },
    modelValue: String
  },
  emits: ['update:modelValue'],
  computed: {
    inputId() {
      return this.label + "Input"
    }
  }
}
</script>