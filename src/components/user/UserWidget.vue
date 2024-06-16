<script>
import {AdvancedImage} from "@cloudinary/vue";

export default {
  name: "UserWidget",
  components: {AdvancedImage},
  props: {
    user: Object
  }
}
</script>

<template>
  <div class="widget-wrapper border-primary border p-2 rounded-1 position-relative shadow">
    <div class="d-flex">
      <AdvancedImage :alt="user.familyName" :cld-img="$cld.image(user.profilePicture)"
                     :height="30"
                     class="rounded-circle shadow me-2">
      </AdvancedImage>
      <div class="h5 text-nowrap">
        {{ user.name }}
      </div>
    </div>
    <div>
      <span v-for="c in user.competencies">{{c.nameDE}}</span>
    </div>
  </div>
</template>

<style scoped>
.widget-wrapper {
}
</style>