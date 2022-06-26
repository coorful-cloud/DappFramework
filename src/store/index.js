import { createStore } from 'vuex'

export default createStore({
    state: {
        currentAccount: null,
    },
    mutations: {

    },
    actions: {
        setCurrentAccount({commit,state}, val){
            state.currentAccount = val
        },
    },
    modules: {
    }
})
