<template>
  <div class="container" v-if="user">
    <div class="d-flex justify-content-start">
      <div>
        <AdvancedImage :cld-img="$cld.image(user.profilePicture)" :height="90" :alt="user.familyName"
                       class="rounded-circle shadow"/>
      </div>
      <div class="flex-fill ms-1 ms-lg-2">
        <div class="h1">{{ user.givenName }} {{ user.familyName }}</div>
        <div class="mt-2">
          <AboutEditor :value="about" @save="updateAbout"/>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <AddressEditor :user-id="user.id"/>
    </div>
    <div class="mt-2">
      <SocialContactsEditor :user-id="user.id"/>
    </div>
    <div class="mt-3">
      <div class="card">
        <div class="card-header">{{ $t('yourLocations') }}</div>
        <div class="card-body">
          <div v-if="locations">
            <div v-if="!locations.countrywide">
              <div>Städte, in denen Du trainierst:</div>
              <div class="badge rounded-pill text-bg-primary me-1" v-for="city in locations.cities"
                   :key="city + '_badge'">
                <span>{{ city }}</span>
              </div>
              <div class="text-muted" v-if="locations.cities.length === 0">Bearbeite Deine Einsatzgebiete durch den
                Knopf unten.
              </div>
            </div>
            <div v-else>Du trainierst deutschlandweit.</div>
            <div class="mt-3">
              <div v-if="locations.remote && locations.onsite">Du trainierst remote und beim Kunden.</div>
              <div v-else-if="locations.remote">Du trainierst ausschließlich remote.</div>
              <div v-else-if="locations.onsite">Du trainierst ausschließlich beim Kunden.</div>
            </div>
            <div data-bs-toggle="modal" data-bs-target="#locationsSelectorModal" class="mt-3 text-end">
              <button class="btn btn-primary btn-sm">
                {{ $t('edit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="card">
        <div class="card-header">{{ $t('competencies') }}</div>
        <div class="card-body">
          <div class="badge rounded-pill text-bg-primary me-1" v-for="category in user.competencies"
               :key="category.id">
            <span>{{ category.nameDE }}</span>
          </div>
          <div data-bs-toggle="modal" data-bs-target="#categorySelectorModal" class="mt-2">
             <span class="action-link">
               <fa-icon icon="fa-plus" class="me-1"/>{{ $t('editCompetencies') }}
             </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="card">
        <div class="card-header">{{ $t('certificatesAndLicenses') }}</div>
        <div class="card-body">
          <div class="list-group">
            <div v-for="certification in certifications"
                 :key="certification.id"
                 class="list-group-item d-flex justify-content-between">
              <div>{{ certification.name }}</div>
              <div>
                <div class="btn btn-danger btn-sm" @click="deleteCertification(certification)"
                     :aria-label="$t('delete')">
                  <fa-icon icon="trash-can"/>
                </div>
                <div class="btn btn-primary btn-sm ms-1"
                     data-bs-toggle="modal" data-bs-target="#certificationEditorModal"
                     @click="editedCertification = certification" :aria-label="$t('edit')">
                  <fa-icon icon="fa-pen"/>
                </div>
              </div>
            </div>
          </div>
          <div data-bs-toggle="modal" data-bs-target="#certificationEditorModal" class="mt-2">
            <span class="action-link" @click="clearEditedCertification">
              <fa-icon icon="fa-plus" class="me-1"/>{{ $t('addCertification') }}
            </span>
          </div>
        </div>
      </div>
      <div id="certificationEditorModal" class="modal fade" tabindex="-1" v-if="about">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <CertificateEditor :modelValue="editedCertification"
                                 @update:modelValue="updateCertifications"/>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3" v-if="about">
        <div class="card">
          <div class="card-header">{{ $t('offerLanguages') }}</div>
          <div class="card-body">
            <div class="d-flex">
              <div v-for="l in about.languages"
                   :key="about.id + '_' + l.iso">
                <AdvancedImage :cld-img="$cld.image('web/languages/' + l.iso)" height="16"
                               class="me-1"/>
              </div>
            </div>
            <div data-bs-toggle="modal" data-bs-target="#languageSelectorModal" class="mt-2">
        <span class="action-link">
          <fa-icon icon="fa-plus" class="me-1"/>{{ $t('editLanguages') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <OffersList :user-id="user.id"/>
      </div>
      <div id="categorySelectorModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <CategorySelector class="mt-1" v-model="competencies"
                                @update:modelValue="updateUserCompetencies"/>
            </div>
          </div>
        </div>
      </div>
      <div id="locationsSelectorModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <LocationsEditor class="mt-1" v-model="locations"
                               @update:modelValue="updateUserLocations"/>
            </div>
          </div>
        </div>
      </div>
      <div id="languageSelectorModal" class="modal fade" tabindex="-1" v-if="about">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <LanguageSelector :modelValue="about.languages" @update:modelValue="updateLanguages"/>
            </div>
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
import CertificateEditor from "@/components/certification/CertificationEditor.vue";
import LocationsEditor from "@/components/locations/LocationsEditor.vue";

export default {
  components: {
    LocationsEditor,
    CertificateEditor,
    AdvancedImage,
    CategorySelector, LanguageSelector, AboutEditor, SocialContactsEditor, OffersList, AddressEditor
  },
  props: {
    nameId: String
  },
  data() {
    return {
      user: null,
      competencies: [],
      locations: null,
      about: null,
      certifications: [],
      editedCertification: null
    }
  },
  methods: {
    async loadUser() {
      this.user = await api.get(`profiles/${this.nameId}`)
          .then(res => res.data)
          .catch(err => handleError(err))
      this.competencies = this.user.competencies
      this.about = await api.get(`users/${this.user.id}/about`)
          .then(res => res.data)
          .catch(err => handleError(err))
      this.locations = await api.get(`users/${this.user.id}/locations`)
          .then(res => res.data)
          .catch(err => handleError(err))
      await this.loadCertifications()
    },
    updateUserCompetencies() {
      console.log('updateUserCompetencies')
      api.post(`users/${this.user.id}/competencies`, this.competencies)
    },
    updateUserLocations() {
      console.log('updateUserLocations')
      if (this.locations)
        if (this.locations.id)
          api.put(`users/${this.user.id}/locations/${this.locations.id}`, this.locations)
        else
          api.post(`users/${this.user.id}/locations`, this.locations)
    },
    async loadCertifications() {
      this.certifications = await api.get(`users/${this.user.id}/certifications`)
          .then(res => {
            return res.data.map(c => {
              return {
                ...c,
                issuedDate: c.issuedDate?.substring(0, c.issuedDate.length - 3),
                expirationDate: c.expirationDate?.substring(0, c.expirationDate.length - 3)
              }
            })
          })
          .catch(err => handleError(err))
    },
    async updateCertifications(certification) {
      const payload = {
        ...certification,
        issuedDate: certification.issuedDate ? `${certification.issuedDate}-01` : null,
        expirationDate: certification.expirationDate ? `${certification.expirationDate}-01` : null
      }
      if (certification.id) {
        await api.put(`users/${this.user.id}/certifications/${certification.id}`, payload)
      } else {
        await api.post(`users/${this.user.id}/certifications`, payload)
      }
      await this.loadCertifications()
    },
    async deleteCertification(certification) {
      await api.delete(`users/${this.user.id}/certifications/${certification.id}`)
      await this.loadCertifications()
    },
    clearEditedCertification() {
      this.editedCertification = {}
    },
    updateLanguages(languages) {
      console.log(languages)
      this.about.languages = languages
      api.post(`users/${this.user.id}/about`, this.about)
          .then(res => this.about = res.data)
          .catch(err => handleError(err))
    },
    updateAbout(about) {
      console.log('updateAbout ' + about)
      this.about = about
      api.post(`users/${this.user.id}/about`, this.about)
          .then(res => this.about = res.data)
          .catch(err => handleError(err))
    },
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
