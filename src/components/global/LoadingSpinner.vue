<template>
  <div class="loading-layer" v-if="loading === true">
  </div>
  <div class="spinner-layer" v-if="loading === true">
    <div class="spinner-border text-primary me-1" role="status">
    </div>
    {{message}}
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    message: String,
    loading: Boolean
  }
}
</script>

<style scoped>
.loading-layer {
  position: absolute;
  top: 0;
  background-color: white;
  opacity: 0.3;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 99999;
}

.spinner-layer {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 999999;
}
</style>