<template>
    <main>
        <div class="container">
            <div class="d-none row mt-5">
                <input v-model="searchTerm" :placeholder="$t('searchLong')" class="form-control form-text shadow"/>
            </div>
            <div class="d-none mt-4 row">
                <div v-for="user in foundUsers" :key="user.id" class="col-6 col-md-3">
                    <router-link :to="{name: 'supplierDetail', params: {id: user.id}}">
                        <div class="card">
                            <div class="card-header">
                                <AdvancedImage :alt="user.familyName" :cld-img="$cld.image(user.profilePicture)"
                                               :height="30"
                                               class="rounded-circle shadow">
                                </AdvancedImage>
                                {{ user.givenName + ' ' + user.familyName }}
                            </div>
                            <div class="card-body">
                                Lorem ipsum ...
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="mt-5">
                <div class="d-block w-100">
                    <textarea class="form-control shadow" ref="aiPrompt" @input="autoresize" rows="5" v-model="aiPrompt" :placeholder="$t('describeProblem')"/>
                </div>
                <button class="btn btn-primary mt-2" @click="searchWithAi" :disabled="aiPrompt.length < 15">
                    Trainings vorschlagen
                </button>
            </div>
            <div class="mt-4 px-2">
                <div v-if="isLoading" class="logo-animation text-center">
                    <!-- Dein Logo hier einfügen -->
                    <img src="/favicons/android-chrome-384x384.png" width="60" alt="Loading">
                </div>
                <div v-else>
                    <div v-html="aiResponse"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {api} from '@/4bw-api'
import {handleError} from "@/utils/notifications";
import {AdvancedImage} from "@cloudinary/vue";

export default {
    components: {
        AdvancedImage
    },
    data() {
        return {
            searchTerm: '',
            foundUsers: [],
            aiPrompt: '',
            aiResponse: '',
            isLoading: false
        }
    },
    methods: {
        async searchWithAi() {
            this.isLoading = true;
            this.aiResponse = ''
            api.post('/recommendations', this.aiPrompt)
                .then(res => this.aiResponse = res.data)
                .catch(err => handleError(err))
                .finally(() => {
                    this.isLoading = false
                })
        },
        autoresize(){
            this.$refs.aiPrompt.style.height = 'auto';
            this.$refs.aiPrompt.style.height = this.$refs.aiPrompt.scrollHeight + 'px';
        }
    },
    watch: {
        searchTerm(newValue) {
            if (newValue && newValue.length > 2) {
                api.get('/search', {
                    params: {
                        term: newValue,
                        type: 'user'
                    }
                }).then(res => this.foundUsers = res.data.map(sr => sr.entity))
                    .catch(err => handleError(err))
            }
        }
    }
}
</script>

<style>
.logo-animation img {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
