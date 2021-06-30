//import axios from "axios";

const state = {
    evaluations: [],
    history : Boolean,
}

const getters = {
    evaluationsHistory: (state) => state.evaluations,
    historyActive : (state) => state.history,
}

const actions = {
    CalcEvaluate ({commit}, result){
        let res = [result.evaluation, result.result];
        if (!state.evaluations.find(item => item[0] == res[0] && item[1] == res[1])) 
            commit({
              type: "Calculate",
              data: res
              });
    },

    ToggleHistoryList({commit}, action){
        commit({
            type: "ToggleHistory",
            data: action,
        })
    }
}

const mutations = {
    Calculate (state, forks){
        state.evaluations.push(forks.data);
    },
    ToggleHistory (state, forks){
        state.history = forks.data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}