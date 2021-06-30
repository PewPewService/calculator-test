<template>
  <div class="result">
        <!-- <input type="text" class="resultLine" readonly :value="result"> -->
        <input type="text" class="evaluationLine" ref="input" @keyup="buttonPress" :value="this.evaluation">
        <p :v-for="str in this.$store">{{str}}</p>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(['evaluation'])
    }
}
</script>

<style>

input[type=text]{
    text-align: right;
    width: 95%;
    height: 1rem;
    border: 0px;
    font-size: 1rem;
    outline: none;
    background-color: cadetblue;
}
.resultLine{
    cursor:default;
    border-bottom: 1px black solid !important;
    margin-bottom: 2px;
}
.result{
    width: 90%;
    background-color: cadetblue;
    float: right;
    border: 1px cadetblue solid;
    border-radius: 5px;
}
</style>