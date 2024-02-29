<template>
  <main>
    <div class="container">
      <div class="row mt-5">
        <input v-model="searchTerm" class="form-control form-text shadow" :placeholder="$t('searchLong')"/>
      </div>
      <div class="mt-4 row">
        <div class="col-6 col-md-3" v-for="user in foundUsers" :key="user.id">
          <router-link :to="{name: 'supplierDetail', params: {id: user.id}}">
            <div class="card">
              <div class="card-header">
                <AdvancedImage :cld-img="$cld.image(user.profilePicture)" :height="30" :alt="user.familyName"
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
      foundUsers: []
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
