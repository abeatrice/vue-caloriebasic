import axios from 'axios';

const state = {
    calories: []
};

const getters = {
    calories(state) {
        return state.calories;
    }
};

const actions = {
    getCalories({commit, rootGetters}) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/me/calories')
            .then(response => {
                commit('storeCalories', response.data.calories);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
};

const mutations = {
    storeCalories: (state, calories) => state.calories = calories
};

export default {
    state,
    getters,
    actions,
    mutations
};