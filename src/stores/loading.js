import {defineStore} from "pinia";

export const loadingStore = defineStore('loading', {
    state() {
        return {
            loading: false,
            message: ''
        }
    },
    actions: {
        setLoading(loading, message) {
            this.loading = loading
            this.message = message
        }
    }
})

