<template>
  <div>
    <div class="position-relative" v-if="about">
      <div v-if="about.headline" class="blockquote-footer">{{ about.headline }}</div>
      <div v-if="about.website"><a :href="about.website">{{ about.website }}</a></div>
    </div>
    <div>
      <span class="action-link small" data-bs-toggle="modal" data-bs-target="#aboutEditorModal">{{$t('editAbout')}}</span>
    </div>
    <div class="modal fade" tabindex="-1" id="aboutEditorModal">>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div>
              <TextInput v-model="about.website" label="website"/>
              <TextInput v-model="about.headline" label="headline"/>
              <div class="text-end">
                <button class="btn btn-danger" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                <button class="btn btn-primary ms-1" data-bs-dismiss="modal" @click="save">{{ $t('save') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/forms/TextInput.vue";
import {api} from "@/4bw-api";
import {handleError} from "@/utils/notifications";

export default {
  name: "AboutEditor",
  components: {TextInput},
  props: {
    userId: String
  },
  data() {
    return {
      about: {
        website: null
      }
    }
  },
  methods: {
    save() {
      api.post(`/users/${this.userId}/about`, this.about)
          .then(res => this.about = res.data)
          .catch(err => handleError(err))
    }
  },
  watch: {
    userId: {
      handler(newVal) {
        if (newVal)
          api.get(`/users/${this.userId}/about`)
              .then(res => this.about = res.data || {})
              .catch(err => handleError(err))
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>