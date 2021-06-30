<template>
  <div id="app">
    <Calculator/>
    <!-- <Result/>
    <Buttons/> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Calculator from './components/Calculator.vue';
/*import Result from './components/Result.vue';
import Buttons from './components/Buttons.vue'; */

export default {
  name: 'App',
  components: {
    Calculator,
    /*Result,
    Buttons*/
  },
  methods: {
    ...mapActions(['ToggleHistoryList']),
  },
  created(){
    document.addEventListener('click', (evt) =>
    {
      if (!evt.target.classList.contains("dontCloseHistory")) this.ToggleHistoryList(true);
    });
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
