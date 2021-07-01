export const moduleName = 'calculations'

export const actionTypes = {
    ACTION_CALCULATE_EVALUATION : 'ACTION_CALCULATE_EVALUATION',
    ACTION_TOGGLE_HISTORY_LIST : 'ACTION_TOGGLE_HISTORY_LIST'
}

export const getterTypes = {
    GETTER_EVALUATIONS_HISTORY : 'GETTER_EVALUATIONS_HISTORY',
    GETTER_ACTIVE_HISTORY : 'GETTER_ACTIVE_HISTORY'
}

export const mutationTypes = {
    MUTATION_ADD_EVALUATIONS : 'MUTATION_ADD_EVALUATIONS',
    MUTATION_SET_HISTORY : 'MUTATION_SET_HISTORY'
}
export default {
    moduleName,
    
    namespaced: true,

    state : () => ({
        evaluations: [],
        history : Boolean,
    }),

    actions : {
        [actionTypes.ACTION_CALCULATE_EVALUATION] ({commit, getters}, result) {
            let res = [result.evaluation, result.result];
            if (!getters[getterTypes.GETTER_EVALUATIONS_HISTORY].find(item => item[0] == res[0] && item[1] == res[1])) {
                commit(mutationTypes.MUTATION_ADD_EVALUATIONS, res);
            }
        },

        [actionTypes.ACTION_TOGGLE_HISTORY_LIST] ({commit}, visibility) {
            commit (mutationTypes.MUTATION_SET_HISTORY, visibility);
        }
    },

    mutations : {
        [mutationTypes.MUTATION_ADD_EVALUATIONS] (state, evaluation) {
            state.evaluations.push(evaluation);
        },
        [mutationTypes.MUTATION_SET_HISTORY] (state, visibility) {
            state.history = visibility;
        }
    },

    getters : {
        [getterTypes.GETTER_EVALUATIONS_HISTORY]: (state) => state.evaluations,
        [getterTypes.GETTER_ACTIVE_HISTORY]: (state) => state.history
    }
}