<template>
  <div id="app">
    <Calculator/>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
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
}

@media (max-width:699px){
  #app {
    width: 94%;
    margin-left:3%;
  }
  .numbers, .actions{
    width: 100%;
  }
}

@media (min-width:700px){
  #app {
    width: 70%;
    margin-left: 15%;
  }
  .numbers, .actions{
    width: 50%;
  }
}
</style>
