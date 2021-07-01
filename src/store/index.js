import Vuex from 'vuex';
import Vue from 'vue';
import calculationsModule, {moduleName as calculationsModuleName} from './modules/calculations';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        [calculationsModuleName] : calculationsModule
    }
});