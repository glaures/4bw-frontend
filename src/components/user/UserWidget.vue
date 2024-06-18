<template>
  <div class="widget-wrapper border-primary border p-2 rounded-1 position-relative shadow"
       @click="$router.push({name: 'supplierDetail', params: {id: user.id}})">
    <div class="d-flex">
      <AdvancedImage :alt="user.familyName" :cld-img="$cld.image(user.profilePicture)"
                     :height="30"
                     class="rounded-circle shadow me-2">
      </AdvancedImage>
      <div class="h5 text-nowrap">
        {{ user.name }}
      </div>
    </div>
    <div class="d-flex text-primary mt-1">
      <div v-for="c in filteredCompetencies" :key="c.id">{{ c['name' + this.language] }}</div>
    </div>
  </div>
</template>

<script>
import {AdvancedImage} from "@cloudinary/vue";
import {getUserLanguage} from "@/utils/user-language";

export default {
  name: "UserWidget",
  components: {AdvancedImage},
  props: {
    user: Object,
    filterCompetencies: Array
  },
  computed: {
    language() {
      return getUserLanguage().toUpperCase()
    },
    filteredCompetencies() {
      const fIds = this.filterCompetencies.map(c => c.id)
      return this.user.competencies.filter(c => fIds.indexOf(c.id) >= 0)
    }
  }
}
</script>

<style scoped>
.widget-wrapper {
  cursor: pointer;
}
</style>