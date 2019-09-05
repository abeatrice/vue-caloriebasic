import Vuex from 'vuex';
import Vue from 'vue';
import Auth from './modules/Auth';
import Calorie from './modules/Calorie';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
        Calorie
    }
});