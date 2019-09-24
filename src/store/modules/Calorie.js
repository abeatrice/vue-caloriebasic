import axios from 'axios';
import moment from 'moment';

const state = {
    calories: {
        "_id": "",
        "date": new Date(),
        "quantity": 0,
        "user_id": ""
    },
    selectedDate: new Date()
};

const getters = {
    calories(state) {
        return state.calories;
    },
    selectedDate(state) {
        return state.selectedDate;
    },
    selectedDateForHumans(state) {
        return new moment(state.selectedDate).format('dddd, MMMM Do YYYY');
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
    adjustCalories({commit, getters, rootGetters}, quantity) {
        //set axios auth header: Bearer + token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/calories', {
                "quantity": quantity,
                "date": getters.selectedDateIso
            })
            .then(response => {
                commit('adjustCalorie', response.data.calorie.quantity);
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
    },
    selectPrevDay({commit, state, dispatch}) {
        const date = moment(state.selectedDate).subtract(1, 'days').toDate();
        commit('updateSelectedDate', date);
        dispatch('getCalories');
    },
    selectNextDay({commit, state, dispatch}) {
        const date = moment(state.selectedDate).add(1, 'days').toDate();
        commit('updateSelectedDate', date);
        dispatch('getCalories');
    }
};

const mutations = {
    storeCalories: (state, calories) => state.calories = calories,
    updateSelectedDate: (state, date) => state.selectedDate = date,
    adjustCalorie: (state, quantity) => state.calories.quantity = quantity
};

export default {
    state,
    getters,
    actions,
    mutations
};