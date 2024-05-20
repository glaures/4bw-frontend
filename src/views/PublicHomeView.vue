<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <main v-if="homeData">
    <div class="container">
      <div class="button-bar-top main-gradient p-2 shadow">
        <button class="btn btn-sm btn-outline-light">Kontakt</button>
        <button class="btn btn-sm btn-outline-light">Verfügbarkeit</button>
      </div>
      <div class="personal-info-panel main-gradient shadow">
        <div class="text-center">
          <AdvancedImage :cld-img="$cld.image(homeData.user.profilePicture)" :height="150" :alt="homeData.user.name"
                         class="rounded-circle shadow"/>
        </div>
        <div class="text-center mt-3">
          <div class="h1">{{ homeData.user.name }}</div>
          <div v-if="homeData.about">{{ homeData.about.description }}</div>
          <div class="horizontal-line"></div>
          <div v-if="homeData.about" class="h4 px-3">{{ homeData.about.headline }}</div>
        </div>
        <div class="mt-5 text-center">
          <div>Email: <span class="fw-bold">{{ homeData.user.email }}</span></div>
          <div class="mt-1" v-if="homeData.address">Phone: <span class="fw-bold">{{ homeData.address.phone }}</span>
          </div>
          <div class="mt-1" v-if="homeData.about.website"><a :href="homeData.about.website"
                                                             class="fw-bold link">{{ homeData.about.website }}</a></div>
        </div>
        <div class="mt-3 text-center" v-if="homeData.socialContacts">
            <span v-for="socialContact in homeData.socialContacts" class="mx-1">
              <a :href="socialContact.socialNetwork.profileUrlPrefix + socialContact.account" class="link">
                <font-awesome-icon :icon="'fab fa-' + socialContact.socialNetwork.faIcon"/>
              </a>
            </span>
        </div>
      </div>
      <div class="about-me-panel mt-5 px-4" v-if="homeData.about.about">
        <div class="h1">Über mich</div>
        {{ homeData.about.about }}
      </div>
      <div class="video-panel mt-5 px-2" v-if="false">
        <LiteYouTubeEmbed
            id="L3j5jvqjj88"
            title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
        />
      </div>
      <div class="offers-panel mt-5 px-4" v-if="homeData.offers">
        <div class="h1">Mein Angebot</div>
        <div class="row mt-4">
          <div class="col-12 col-md-6" v-for="offer in homeData.offers" :key="offer.id">
            <div class="h5">{{ offer.name }}</div>
            <div class="mt-2 offer-description" style="
                   text-overflow: ellipsis;"><span v-html="offer.description"/></div>
          </div>
        </div>
      </div>
      <div class="skills-panel main-gradient mt-5 text-white p-5">
        <div class="h1 mb-3">{{ $t('competencies') }}</div>
        <div v-for="competence in homeData.competencies">{{ competence.nameDE }}</div>
        <div class="h1 mt-5">{{ $t('languages') }}</div>
        <div>
          <div v-for="language in homeData.about.languages"
               :key="'lang_' + language.id">
            {{ language[userLanguage] }}
          </div>
        </div>
      </div>
      <div>
        <div class="h3 mt-4">Einsatzgebiete</div>
        <GoogleMap
            v-if="homeData.locations.cities.length > 0"
            api-key="AIzaSyANXKyB1vwtOfjQ2NCbeQiQUhj3DRkyZPc"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="6"
        >
          <Marker v-for="city in homeData.locations.cities" :key="city.name" :options="{ position: {lat: city.lat, lng: city.lng}, label: city.name }" />
        </GoogleMap>
      </div>
    </div>
  </main>
  <div class="settings-menu d-none" id="settings-menu" v-if="homeData?.settings && (nameId === user?.nameId)">
    <div class="format-group d-flex justify-content-between">
      <label class="form-label me-2" for="#colorPicker1">Farbe 1</label>
      <ColorPicker ref="colorPicker1" id="colorPicker1" class="form-control"
                   v-model:pure-color="homeData.settings.color1"
                   use-type="pure" lang="En"/>
    </div>
    <div class="format-group d-flex justify-content-between">
      <label class="form-label me-2" for="#colorPicker2">Farbe 2</label>
      <ColorPicker id="colorPicker2" class="form-control" v-model:pure-color="homeData.settings.color2"/>
    </div>
    <div class="format-group d-flex justify-content-between">
      <label class="form-label me-2" for="#colorPicker2">Schrift</label>
      <ColorPicker id="colorPicker2" class="form-control" v-model:pure-color="homeData.settings.fontColor"/>
    </div>
    <div class="text-end mt-2">
      <div class="btn btn-sm btn-primary" @click="saveSettings">Speichern</div>
    </div>
    <div class="text-end mt-2">
      <router-link :to="{name: 'editProfile', params: {nameId: nameId}}">Profil-Einstellungen</router-link>
    </div>
  </div>
</template>

<script>
import {AdvancedImage} from "@cloudinary/vue";
import {handleError, showInfo} from "@/utils/notifications";
import {api} from "@/4bw-api";
import {ColorPicker} from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import {mapState} from "pinia";
import {authStore} from "@/stores/auth";
import {getUserLanguage} from "@/utils/user-language";
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  components: {AdvancedImage, ColorPicker, GoogleMap, Marker},
  props: {
    nameId: String
  },
  data() {
    return {
      homeData: null,
    }
  },
  computed: {
    ...mapState(authStore, ['user']),
    userLanguage() {
      return getUserLanguage()
    },
    center() {
      const cityCount = this.homeData.locations.cities.length
      if(cityCount === 0)
        return null
      let latSum = 0
      let lngSum = 0
      for(let cIdx = 0; cIdx < cityCount; cIdx++){
        const c = this.homeData.locations.cities[cIdx]
        latSum += c.lat
        lngSum +=c.lng
      }
      return {
        lat: latSum / cityCount,
        lng: lngSum / cityCount
      }
    }
  },
  methods: {
    loadHomeData() {
      api.get(`/public-home/${this.nameId}`)
          .then(res => this.homeData = {fresh: true, ...res.data})
          .catch(err => handleError(err))
    },
    saveSettings() {
      api.post(`/public-home/${this.nameId}/settings`, this.homeData.settings)
          .then(res => {
            this.homeData = res.data
            showInfo("Die Änderungen wurden gespeichert.")
          })
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

<style scoped>
.main-gradient {
  background-color: transparent;
  background-image: linear-gradient(90deg, v-bind('homeData?.settings.color1') 0%, v-bind('homeData?.settings.color2') 100%);
  color: v-bind('homeData?.settings.fontColor');
}

.button-bar-top {
  display: flex;
  justify-content: space-between;
}

.horizontal-line {
  border-top: 1px solid v-bind('homeData?.settings.fontColor');
  min-height: 2vh;
  margin-top: 1vh;
}

.link {
  color: v-bind('homeData?.settings.fontColor');
}

.hr {
  margin: 15px;
  height: 2px;
  background-color: white;
}

.personal-info-panel {
  padding: 20px;
}

.video-panel {

}

.social-contacts-panel {

}

.about-me-panel {
  font-size: 1.3em;
  line-height: 1.5em;
  text-align: left;
}

.offers-panel {

}

.offer-description {
  max-height: 20vh;
  overflow-y: hidden;
  text-overflow: ellipsis;
}

.skills-panel {

}

.location-panel {

}

.settings-menu {
  position: fixed;
  bottom: 1vh;
  left: 1vw;
  padding: 12px;
  background-color: white;
  border: 1px solid black;
}
</style>
