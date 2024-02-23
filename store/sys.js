
import apis from "$apis/index.js";
export default {
    namespaced: true,
    state: {
        isLock: false
    },
    mutations: {
        isLock(state, flag) {
            state.isLock = flag
        },

    },
    actions: {
    },
    getters: {
        isLock: state => state.isLock,

    }
}