import axios from 'axios';

const apiAddress = process.env.VUE_APP_API_ADDRESS;

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null
};

const getters = {
    authToken(state) {
        return state.user.token || null;
    },
    loggedIn(state) {
        return state.user !== null;
    },
    userName(state) {
        if (state.user == null) {
            return '';
        }
        return state.user.userName;
    }
};

const actions = {
    register({commit}, form) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiAddress}/users`, {
                userName: form.userName,
                email: form.email,
                password: form.password
            })
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
    login({commit}, form) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiAddress}/users/login`, form)
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
    logout(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.user.token;

        if(context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
                axios.post(`${apiAddress}/users/me/logout`)
                .then(response => {
                    localStorage.removeItem('user');
                    context.commit('loggedOut');
                    resolve(response);
                })
                .catch(error => {
                    localStorage.removeItem('user');
                    context.commit('loggedOut');
                    reject(error);
                })
            });
        }
    }
};

const mutations = {
    loggedIn: (state, user) => state.user = user,
    loggedOut: (state) => state.user = null
};

export default {
    state,
    getters,
    actions,
    mutations
};