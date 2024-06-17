import { createStore } from 'vuex'

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        calculateBaseFood({ commit }, weight) {
            return new Promise((resolve, reject) => {
                const result = weight / 10; // 假设基础代谢为 2500 卡路里
                resolve(result);
            });
        }
    },
    modules: {
    }
});
