import axios from 'axios';

const state = {
    calories: [],
    selectedIndex: 0
};

const getters = {
    calories(state) {
        return state.calories;
    },
    selectedIndex(state) {
        return state.selectedIndex;
    }
};

const actions = {
    getCalories({commit, rootGetters}) {
        //set axios auth header: Bearer + token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        //get calories and commit them to store
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/me/calories`)
            .then(response => {
                commit('storeCalories', response.data.calories);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    selectPrevDay({commit, getters}) {
        if(getters.selectedIndex + 1 < getters.calories.length) {
            commit('updateSelectedIndex', 1);
        }
    },
    selectNextDay({commit, getters}) {
        if(getters.selectedIndex > 0) {
            commit('updateSelectedIndex', -1);
        }
    }
};

const mutations = {
    storeCalories: (state, calories) => state.calories = calories,
    updateSelectedIndex: (state, value) => state.selectedIndex += value
};

export default {
    state,
    getters,
    actions,
    mutations
};