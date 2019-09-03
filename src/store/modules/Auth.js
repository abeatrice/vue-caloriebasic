import axios from 'axios';

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null
};

const getters = {};

const actions = {
    login({commit}, form) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/users/login', form)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                commit('loggedIn', response.data.user);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    register({commit}, form) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/users', {
                name: form.name,
                email: form.email,
                password: form.password
            })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                commit('loggIn', response.data.user);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
};

const mutations = {
    loggedIn: (state, user) => state.user = user,
};

export default {
    state,
    getters,
    actions,
    mutations
};