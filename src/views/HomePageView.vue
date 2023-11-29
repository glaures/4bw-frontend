<template>
  <main>
    <div class="container" v-if="homeData">
      <img :src="homeData.user.profilePicture"/>
      {{ homeData.user.givenName }}
    </div>
  </main>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications"

export default {
  props: {
    nameId: String
  },
  data() {
    return {
      homeData: null
    }
  },
  methods: {
    loadHomeData() {
      api.get(`/homes/${this.nameId}`)
          .then(res => this.homeData = res.data)
          .catch(err => handleError(err))
    }
  },
  watch: {
    nameId: {
      handler(newVal) {
        this.loadHomeData()
      },
      immediate: true
    }
  }
}
</script>
