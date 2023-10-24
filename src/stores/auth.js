import {api, setAuthtoken} from '@/4bw-api'
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
            this.user = await api.get('/users', {
                params: {
                    authtoken: authtoken
                }
            })
                .then(res => res.data)
                .catch(err => handleError(err))
        }
    },
    getters: {
        loggedIn(state){
            return state.user
        }
    }
})
