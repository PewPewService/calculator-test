<template>
  <div id="app">
    <CalculatorItem/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes, moduleName } from './store/modules/calculations' ;
import CalculatorItem from './components/CalculatorItem.vue';

export default {
  name: 'App',
  components: {
    CalculatorItem,
  },
  created(){
    document.addEventListener('click', (evt) =>
    {
      if (!evt.target.classList.contains("HistoryListDontClose")) this.ToggleHistoryList(true);
    });
  },
  methods: {
    ...mapActions(moduleName, [
      actionTypes.ACTION_TOGGLE_HISTORY_LIST
    ]),
    ToggleHistoryList(visibility) {
      return this[actionTypes.ACTION_TOGGLE_HISTORY_LIST](visibility);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  border: 3px black solid;
  border-radius: 5px;
  z-index: 10;
}

@media (max-width:699px){
  #app {
    width: 80%;
    margin-left:10%;
  }
  .numbers, .actions{
    width: 100%;
  }
}

@media (min-width:700px){
  #app {
    width: 60%;
    margin-left: 20%;
  }
  .numbers, .actions{
    width: 50%;
  }
}
</style>
