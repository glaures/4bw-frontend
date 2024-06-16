<template>
  <div>
    <div class="input-group mt-3">
      <input id="remoteInput" type="checkbox" class="form-check-input me-2" v-model="locations.remote">
      <label for="#remoteInput">Ich trainiere auch remote.</label>
    </div>
    <div class="input-group mt-3">
      <input id="onsiteInput" type="checkbox" class="form-check-input me-2" v-model="locations.onsite">
      <label for="#onsiteInput">Ich trainiere auch beim Kunden.</label>
    </div>
    <div class="input-group mt-3">
      <input id="countrywideInput" type="checkbox" class="form-check-input me-2" v-model="locations.countrywide">
      <label for="#countrywideInput">Ich trainiere deutschlandweit.</label>
    </div>
    <div v-if="!locations.countrywide" class="mt-4">
      <div>Städte, in denen Du trainierst</div>
      <div class="badge rounded-pill text-bg-primary me-1" v-for="city in locations.cities"
           :key="city + '_badge'">
        <span>{{ city.name }}</span>
        <fa-icon class="ms-1" icon="circle-xmark" @click="deselectCity(city)"/>
      </div>
      <div class="input-group mt-3">
        <input id="cityInput" list="cities" v-model="filter" class="form-control" @input="checkDatalistSelection"
               :placeholder="$t('cityPlaceholder')"
               @keydown.enter="selectCity"/>
        <datalist id="cities">
          <option v-for="city in filteredCities" :key="city + '_option'" :value="city.name"/>
        </datalist>
      </div>
    </div>
    <div class="mt-3 text-end">
      <button class="btn btn-danger" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
      <button class="ms-2 btn btn-primary" data-bs-dismiss="modal"
              @click="$emit('update:modelValue', this.locations)">
        {{ $t('save') }}
      </button>
    </div>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";

export default {
  name: "LocationsEditor",
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue', 'cancel'],
  data() {
    return {
      locations: {
        remote: true,
        onsite: true,
        countrywide: true,
        cities: []
      },
      allCities: [],
      filter: ''
    }
  },
  computed: {
    filteredCities() {
      return this.allCities
          .filter(c => c.name.toLowerCase().includes(this.filter.toLowerCase()))
    }
  },
  methods: {
    loadAllCities() {
      api.get('/configuration/cities')
          .then(res => this.allCities = res.data)
          .catch(err => handleError(err))
    },
    selectCity() {
      console.log("selectCity")
      let city = this.allCities.find(c => c.name === this.filter)
      if (city) {
        this.locations.cities.push(city)
        this.filter = ''
      }
    },
    deselectCity(city) {
      this.locations.cities.splice(this.locations.cities.indexOf(city), 1)
    },
    checkDatalistSelection(e) {
      console.log("checkSelection")
      let v = e.target.value;
      if (v.slice(-1) === '\xa0') {
        console.log("selected")
        // selection
        this.filter = v.slice(0, -1)
      }
      this.selectCity();
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (newVal)
          this.locations = newVal
      },
      immediate: true
    }
  },
  mounted() {
    this.loadAllCities()
  }
}
</script>

<style scoped>

</style>