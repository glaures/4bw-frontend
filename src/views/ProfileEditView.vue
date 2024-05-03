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
            <div class="card">
                <div class="card-header">Kompetenzen</div>
                <div class="card-body">
                    <div class="badge rounded-pill text-bg-primary me-1" v-for="category in user.competencies"
                         :key="category.id">
                        <span>{{ category.nameDE }}</span>
                    </div>
                    <div data-bs-toggle="modal" data-bs-target="#categorySelectorModal" class="mt-2">
        <span class="action-link">
          <fa-icon icon="fa-plus" class="me-1"/>{{ $t('editCompetencies') }}</span>
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
                        <CategorySelector class="mt-1" v-model="competencies"
                                          @update:modelValue="updateUserCompetencies"/>
                    </div>
                </div>
            </div>
        </div>
        <div id="languageSelectorModal" class="modal fade" tabindex="-1"  v-if="about">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <LanguageSelector :modelValue="about.languages" @update:modelValue="updateLanguages"/>
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
        CategorySelector, LanguageSelector, AboutEditor, SocialContactsEditor, OffersList, AddressEditor
    },
    props: {
        nameId: String
    },
    data() {
        return {
            user: null,
            competencies: [],
            about: null
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
        },
        updateUserCompetencies() {
            console.log('updateUserCompetencies')
            api.post(`profiles/${this.user.id}/competencies`, this.competencies)
        },
        updateLanguages(languages){
            console.log(languages)
            this.about.languages = languages
            api.post(`users/${this.user.id}/about`, this.about)
                .then(res => this.about = res.data)
                .catch(err => handleError(err))
        },
        updateAbout(about){
            console.log('updateAbout ' + about)
            this.about = about
            api.post(`users/${this.user.id}/about`, this.about)
                .then(res => this.about = res.data)
                .catch(err => handleError(err))
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
