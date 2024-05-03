import {api, clearAuthtoken, setAuthtoken} from '@/4bw-api'
import {defineStore} from "pinia";
import {handleError} from '@/utils/notifications'

export const authStore = defineStore('auth', {
    state() {
        return {
            authtoken: undefined,
            user: undefined
        }
    },
    actions: {
        async login(authtoken) {
            this.authtoken = authtoken
            setAuthtoken(authtoken)
            return await api.get('/users/me')
                .then(res => this.user = res.data)
                .catch(err => handleError(err))
        },
        async logout(){
            this.authtoken = null
            clearAuthtoken()
            this.user = null
        }
    },
    getters: {
        loggedIn(state) {
            return state.user
        }
    }
})

