<template>
  <div class="container">

  </div>
</template>

<script>
import {mapActions} from "pinia";
import {loadingStore} from "@/stores/loading";
import {api} from "@/4bw-api";
import {handleError, showInfo} from "@/utils/notifications";

export default {
  props: {
    code: String
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions(loadingStore, ['setLoading']),
    confirm() {
      api.post('/activations', {
        code: this.code
      }).then(res => {
        showInfo(this.$t('emailConfirmed'))
        this.$router.push({
          name: 'login'
        })
      }).catch(err => handleError(err))
    }
  },
  mounted() {
    this.setLoading(true, this.$t('confirmingEmail'))
    try {
      this.confirm()
    } finally {
      this.setLoading(false, '')
    }
  }
}
</script>

<style scoped>

</style>