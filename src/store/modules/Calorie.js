import axios from 'axios';
import moment from 'moment';

const apiAddress = process.env.VUE_APP_API_ADDRESS;

let initialState = () => {

    let weekOfCalories = [];
    let today = new moment();
    let selectedDate = new Date();

    for(let i = 0; i < 7; i++) {
        weekOfCalories.unshift({
            "_id": {
                "date": today.format('YYYY-MM-DD'),
            },
            "quantity": 0
        });
        today.subtract(1,'day');
    }

    let calories = {
        "_id": "",
        "date": selectedDate,
        "quantity": 0,
        "user_id": ""
    };

    return {
        calories,
        weekOfCalories,
        selectedDate
    }
}

const state = initialState();

const getters = {
    calories(state) {
        return state.calories;
    },
    weekOfCalories(state) {
        return state.weekOfCalories;
    },
    selectedDate(state) {
        return state.selectedDate;
    },
    selectedDateForHumans(state) {
        return new moment(state.selectedDate).format('dddd, MMMM Do YYYY');
    },
    selectedDateIso(state) {
        return new moment(state.selectedDate).format('YYYY-MM-DD');
    },
    chartData(state) {
        return state.weekOfCalories.map(({quantity}) => quantity);
    }
};

const actions = {
    resetInitialState({commit}) {
        commit('resetState');
    },
    getCalories({commit, getters, rootGetters}) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        //get calories and commit them to store
        return new Promise((resolve, reject) => {
            axios.get(`${apiAddress}/me/calories/${getters.selectedDateIso}`)
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
    getWeekOfCalories({commit, getters, rootGetters}) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        //get a week of calories and commit them to the store
        return new Promise((resolve, reject) => {
            axios.get(`${apiAddress}/me/caloriesWeekPrior/${getters.selectedDateIso}`)
            .then(response => {
                const data = response.data.calories ? response.data.calories : [
                    {
                        "_id": {
                            "date": new Date(),
                        },
                        "quantity": 0
                    }
                ];
                commit('storeWeekOfCalories', data);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    adjustCalories({commit, getters, rootGetters}, quantity) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.authToken;

        return new Promise((resolve, reject) => {
            axios.post(`${apiAddress}/calories`, {
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
    }
};

const mutations = {
    resetState: (state) => {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    },
    storeCalories: (state, calories) => state.calories = calories,
    updateSelectedDate: (state, date) => state.selectedDate = date,
    adjustCalorie: (state, quantity) => {
        for(let i = 0; i < state.weekOfCalories.length; i++) {
            if(state.weekOfCalories[i]._id.date == new moment(state.selectedDate).format('YYYY-MM-DD')) {
                state.weekOfCalories[i].quantity = quantity;
            }
        }
        state.calories.quantity = quantity
    },
    storeWeekOfCalories: (state, weekOfCalories) => {
        for(let i = 0; i < state.weekOfCalories.length; i++) {
            for(const c of weekOfCalories) {
                if(state.weekOfCalories[i]._id.date == c._id.date) {
                    state.weekOfCalories.splice(i, 1, c);
                }
            }
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};