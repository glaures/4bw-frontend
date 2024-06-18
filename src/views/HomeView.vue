<template>
  <main>
    <div class="container">
      <div class="d-none row mt-5">
        <input v-model="searchTerm" :placeholder="$t('searchLong')" class="form-control form-text shadow"/>
      </div>
      <div class="mt-5">
        <div class="d-block w-100">
                    <textarea class="form-control shadow" ref="aiPrompt" @input="autoresize" rows="5" v-model="aiPrompt"
                              :placeholder="$t('describeProblem')"/>
        </div>
        <button class="btn btn-primary mt-2" @click="searchWithAi" :disabled="aiPrompt.length < 15">
          {{$t('findTrainings')}}
        </button>
      </div>
      <div class="mt-4 px-2 mb-5">
        <div v-if="aiResponse">
          <div v-html="aiResponseRendered"/>
          <div class="mt-2 fw-bold">Was Deine Trainerin mitbringen muss:</div>
          <div class="mt-1 d-flex flex-wrap">
                        <span class="text-nowrap mt-1 mx-1 px-2 py-1 rounded-pill bg-info text-white small"
                              v-for="c in aiResponse.categories" :key="c.id">{{ c.nameDE }}</span>
          </div>
          <div class="mt-3">
            <div class="mt-2 mb-2 fw-bold">Wir haben diese Trainer für Dich gefunden:</div>
            <div class="row">
              <div v-for="user in foundUsers" :key="user.id" class="col-6 col-md-6 mt-2">
                <UserWidget :user="user" :filterCompetencies="aiResponse.categories"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {api} from '@/4bw-api'
import {handleError} from "@/utils/notifications";
import {AdvancedImage} from "@cloudinary/vue";
import MarkdownIt from "markdown-it";
import UserWidget from "@/components/user/UserWidget.vue";
import {mapActions} from "pinia";
import {loadingStore} from "@/stores/loading";

const markdownit = new MarkdownIt()

export default {
  components: {
    UserWidget,
    AdvancedImage
  },
  data() {
    return {
      searchTerm: '',
      foundUsers: [],
      aiPrompt: '',
      aiResponse: ''
    }
  },
  computed: {
    aiResponseRendered() {
      return markdownit.render(this.aiResponse.recommendation)
    }
  },
  methods: {
    ...mapActions(loadingStore, ['setLoading']),
    async searchWithAi() {
      this.setLoading(true, this.$t('askingAi'))
      this.aiResponse = ''
      api.post('/recommendations', {prompt: this.aiPrompt})
          .then(res => this.aiResponse = res.data)
          .catch(err => handleError(err))
          .finally(() => {
            this.setLoading(false)
          })
    },
    autoresize() {
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
    },
    async aiResponse(newVal) {
      if (newVal.categories) {
        const categories = newVal.categories.map(c => c.id)
        console.log(categories)
        this.foundUsers = await api.get('/fusers', {
          params: {
            categories: newVal.categories.map(c => c.id).join()
          }
        }).then(res => res.data)
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
