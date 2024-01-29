<template>
  <div>
    <div class="badge rounded-pill text-bg-primary me-1" v-for="category in selectedCategories"
         :key="category.id">
      <span>{{ category.nameDE }}</span>
      <fa-icon class="ms-1" icon="circle-xmark" @click="deselectCategory(category)"/>
    </div>
    <div class="input-group mt-3">
      <input list="categories" v-model="filter" class="form-control" @input="checkDatalistSelection"
             :placeholder="$t('competenceSelectorPlaceholder')"
             @keydown.enter="selectCategory"/>
      <button class="btn btn-sm btn-secondary ms-1" @click="selectCategory">{{ $t('add') }}</button>
      <datalist id="categories">
        <option v-for="category in filteredCategories" :key="category.id" :value="category.nameDE"/>
      </datalist>
    </div>
    <div class="mt-3 text-end">
      <button class="btn btn-danger" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
      <button class="ms-2 btn btn-primary" data-bs-dismiss="modal" @click="$emit('update:modelValue', this.selectedCategories)">
        {{ $t('save') }}
      </button>
    </div>
  </div>
</template>

<script>
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";

export default {
  name: "CategorySelector",
  props: {
    modelValue: Array
  },
  emits: ['update:modelValue', 'cancel'],
  data() {
    return {
      allCategories: [],
      selectedCategories: [],
      filter: ''
    }
  },
  computed: {
    filteredCategories() {
      return this.allCategories
          .filter(c => c.nameDE.includes(this.filter))
          .map(c => {
            let cNew = {...c}
            cNew.nameDE = c.nameDE + '\xa0'
            return cNew
          })
    }
  },
  methods: {
    loadAllCategories() {
      api.get('/configuration/categories')
          .then(res => this.allCategories = res.data)
          .catch(err => handleError(err))
    },
    selectCategory() {
      let category = this.allCategories.find(c => c.nameDE === this.filter)
      if (!category) {
        category = {
          nameDE: this.filter
        }
      }
      this.selectedCategories.push(category)
      this.filter = ''
    },
    deselectCategory(category) {
      this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1)
    },
    checkDatalistSelection(e) {
      let v = e.target.value;
      if (v.slice(-1) === '\xa0') {
        // selection
        this.filter = v.slice(0, -1)
        this.selectCategory();
      }
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
          if(newVal)
            this.selectedCategories = newVal
      },
      immediate: true
    }
  },
  mounted() {
    this.loadAllCategories()
  }
}
</script>

<style scoped>

</style>