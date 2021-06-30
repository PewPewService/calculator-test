import Vuex from 'vuex';
import Vue from 'vue';
import Calculations from './modules/calculations';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Calculations
    }
});