<template>
  <div class="container" v-if="user">
    <div class="d-flex justify-content-start">
      <div>
        <AdvancedImage :cld-img="$cld.image(user.profilePicture)" :height="90" :alt="user.familyName" class="rounded-circle shadow"/>
      </div>
      <div class="flex-fill ms-1 ms-lg-2">
        <div class="h1">{{ user.givenName }} {{ user.familyName }}</div>
        <div class="mt-2">
          <AboutEditor :user-id="user.id"/>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div>
        <div class="badge rounded-pill text-bg-primary me-1" v-for="category in user.competencies"
             :key="category.id">
          <span>{{ category.nameDE }}</span>
        </div>
      </div>
      <div data-bs-toggle="modal" data-bs-target="#categorySelectorModal" class="mt-2">
        <span class="action-link">
          <fa-icon icon="fa-plus" class="me-1"/>{{ $t('editCompetencies') }}</span>
      </div>
    </div>
    <div class="mt-3">
      <AddressEditor :user-id="user.id"/>
    </div>
    <div class="mt-2">
      <SocialContactsEditor :user-id="user.id"/>
    </div>
    <div class="mt-3">
      <OffersList :user-id="user.id"/>
    </div>
    <div id="categorySelectorModal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <CategorySelector class="mt-1" v-model="competencies" @update:modelValue="updateUserCompetencies"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from '@/4bw-api'
import {handleError} from "@/utils/notifications";
import AddressEditor from "@/components/profile/AddressEditor.vue";
import OffersList from "@/components/offer/OffersList.vue";
import SocialContactsEditor from "@/components/profile/SocialContactsEditor.vue";
import AboutEditor from "@/components/profile/AboutEditor.vue";
import LanguageSelector from "@/components/language/LanguageSelector.vue";
import CategorySelector from "@/components/category/CategorySelector.vue";
import {AdvancedImage} from "@cloudinary/vue";

export default {
  components: {
    AdvancedImage,
    CategorySelector, LanguageSelector, AboutEditor, SocialContactsEditor, OffersList, AddressEditor},
  props: {
    nameId: String
  },
  data() {
    return {
      user: null,
      competencies: []
    }
  },
  methods: {
    loadUser() {
      api.get(`profiles/${this.nameId}`)
          .then(res => {
            this.user = res.data
            this.competencies = this.user.competencies
          })
          .catch(err => handleError(err))
    },
    updateUserCompetencies() {
      api.post(`profiles/${this.user.id}/competencies`, this.competencies)
    }
  },
  activated() {
    this.loadUser()
  },
  mounted() {
    this.loadUser()
  }
}
</script>


<style scoped>

</style>