import axios from 'axios';
import moment from 'moment';

const state = {
    calories: {
        "_id": "",
        "date": moment().format('YYYY-MM-DD'),
        "quantity": 0,
        "user_id": ""
    },
    selectedDate: moment().format('YYYY-MM-DD')
};

const getters = {
    calories(state) {
        return state.calories;
    },
    selectedDate(state) {
        return state.selectedDate;
    },
    selectedDateIso(state) {
        return new moment(state.selectedDate).format('YYYY-MM-DD');
    }
};

const actions = {
    getCalories({commit, getters, rootGetters}) {
        //set axios auth header: Bearer + token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        //get calories and commit them to store
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/me/calories/${getters.selectedDateIso}`)
            .then(response => {
                const data = response.data.calories ? response.data.calories : {
                        "_id": "",
                        "date": getters.selectedDateIso,
                        "quantity": 0,
                        "user_id": ""
                };
                commit('storeCalories', data);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    adjustCalories({commit, rootGetters}, quantity) {
        //set axios auth header: Bearer + token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/calories', {
                "quantity": quantity
            })
            .then(response => {
                commit('adjustCalorie', quantity);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
        });

    },
    updateSelectedDate({commit, dispatch}, date) {
        commit('updateSelectedDate', date);
        dispatch('getCalories');
    }
};

const mutations = {
    storeCalories: (state, calories) => state.calories = calories,
    updateSelectedDate: (state, date) => state.selectedDate = date,
    adjustCalorie: (state, quantity) => state.calories[state.selectedIndex].quantity += quantity
};

export default {
    state,
    getters,
    actions,
    mutations
};