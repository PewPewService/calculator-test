<template>
  <div class="calculator">
      <div class="historyList dontCloseHistory" :hidden="this.historyActive">
          <input type="button" class="historyButton dontCloseHistory" @click="historyClick">
          <p :hidden="this.evaluationsHistory.length>0" class="dontCloseHistory">
              Your calculations and results appear here so that you can reuse them
          </p>
          <p class="dontCloseHistory historyElement" v-for="result in this.evaluationsHistory" :key="result[0]+result[1]">
              <span class="clickable" @click="moveToEvaluationLine">{{result[0]}}</span>
              = 
              <span class="clickable" @click="moveToEvaluationLine">{{result[1]}}</span>
          </p>
      </div>
      <div class="result">
          <input type="button" :hidden="!this.historyActive" class="historyButton dontCloseHistory" @click="historyClick">
          <input type="text" class="resultLine" readonly :value="result">
          <input type="text" class="evaluationLine" ref="input" @keyup="buttonPress">
      </div>
      <div class="buttons">
          <div class="numbers">
            <input type="button" class="button button_numbers" @click="buttonClick" v-for="number in Numbers" :key="number" :value="number">
          </div>
          <div class="actions">
            <input type="button" class="button button_actions" @click="buttonClick" v-for="action in Actions.concat(Brackets)" :key="action" :value="action">
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Calculator",
    data(){
        return{
            Numbers : ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'],
            Actions : ['<-', '=', 'C', '+', '-', '*', '/'],
            Brackets : ['(', ')'],
            result: '',
            evaluation: '',
            history: {},
        }
    },
    computed: {
        ...mapGetters(['evaluationsHistory']),
        ...mapGetters(['historyActive']),
    },
    methods: {
        ...mapActions(['CalcEvaluate']),
        ...mapActions(['ToggleHistoryList']),
        showAnswer(){
            let OpeningBrackets = this.evaluation.match(/\(/g)? this.evaluation.match(/\(/g).length : 0;
            let ClosingBrackets = this.evaluation.match(/\)/g)? this.evaluation.match(/\(/g).length : 0;
            let BracketsDifference = OpeningBrackets - ClosingBrackets;
            if (BracketsDifference > 0) {
                for (let i = 0; i < BracketsDifference; i++)
                    this.evaluation=this.evaluation+')';
            }
            else {
                for (let i = 0; i > BracketsDifference; i--)
                    this.evaluation = '(' + this.evaluation;
            }
            try{
                let evalResult = eval(this.evaluation);
                if (evalResult!==undefined){
                    this.result = this.evaluation + ' = ' + evalResult;
                    let SendingResult = {'evaluation' : this.evaluation, 'result' : evalResult};
                    this.CalcEvaluate(SendingResult);
                }
            }
            catch (err){
                console.log(err);
            }
            this.evaluation = '';
        },
        lastInput(){
            return this.evaluation.substr(-1);
        },
        penultimateInput(){
            if (this.evaluation.length<2) return '+';
            return this.evaluation.substr(-2,1);
        },
        cursorToTheEnd(){
            this.$refs.input.focus();
            this.$refs.input.selectionStart = this.$refs.input.value.length;
        },
        clearInputField(){
            this.$refs.input.value=this.evaluation;
        },
        buttonClick(clickEvent){
            this.HandlePress(clickEvent.target.value);
        },
        buttonPress(button){
            this.cursorToTheEnd();
            if (this.Numbers.includes(button.key) || this.Actions.includes(button.key.toUpperCase()) || this.Brackets.includes(button.key)
              || button.key == 'Backspace' || button.key == 'Enter') this.HandlePress(button.key);
            else this.clearInputField();
        },
        HandlePress(button){
            if (button == '=' || button == "Enter"){
                this.showAnswer();
            }
            else if (button == "Backspace" || button == '<-') this.evaluation = this.evaluation.slice(0,-1);
            else if ( this.Actions.includes(button) && this.Actions.includes(this.lastInput())) {
                this.evaluation = this.evaluation.slice(0,-1);
                this.evaluation += button;
            }
            else if ( this.lastInput() == '0' && this.Numbers.includes(button) 
              && this.Actions.includes(this.penultimateInput()) && button !='.' ){
                this.evaluation = this.evaluation.slice(0,-1) + button;
            }
            else if ( ((this.Actions.includes(this.lastInput()))
              || ( !this.Actions.includes(this.lastInput())))
              && !( ( this.Numbers.includes(this.lastInput()) && button == '(' )
              || ( this.Actions.includes(this.lastInput()) && button == ')' )
              || (this.lastInput() == '(' && this.Actions.includes(button) ) ) ) this.evaluation += button;
            
            if (button.toUpperCase() == 'C') this.evaluation='';
            this.clearInputField();
        },
        historyClick(){
            this.ToggleHistoryList(this.historyActive? false : true);
        },
        moveToEvaluationLine(clickEvent){
            this.evaluation = clickEvent.target.innerHTML;
            this.clearInputField();
        }
    }
}
</script>

<style>
input[type=text]{
    margin-right: 0.5rem;
    float: right;
    text-align: right;
    width: calc(100% - 3.5rem);
    height: 1rem;
    border: 0px;
    font-size: 1rem;
    outline: none;
    background-color: cadetblue;
}
.resultLine{
    cursor:default;
    border-bottom: 0.1rem black solid !important;
    margin-bottom: 0.4rem;
}
.result{
    width: 100%;
    background-color: cadetblue;
    border-radius: 5px;
    display: inline-block;
}
.historyButton{
    width: 1.5rem;
    height: 1.5rem;
    float: left;
    background-image: url("../assets/history.png");
    background-repeat: round;
    margin-left: 0.5rem;
    border: none;
    background-color: unset;
}
.historyButton:hover{
    filter: invert(100%);
}
.historyList .historyButton{
    float: none;
}
.historyList{
    text-align: left;
    width: 40%;
    max-height: 50%;
    padding: 0.5rem;
    background-color: gainsboro;
    font-size: 1rem;
    color: black;
    position: fixed;
    border-radius: 1rem;
    cursor:default;
    overflow: auto;
}

.button{    
    height: 2rem;
    margin: 5px 5px;
    font-size: 1rem;
    border: 1px black;
    border-radius: 5px;
    flex: 27%;
}

.button_numbers{
    color: whitesmoke;
    background-color: teal;
}
.button_numbers:hover{
    background-color:rgb(22, 198, 204);
}
.button_actions{
    color: black;
    background-color: orange;
}
.button_actions:hover{
    background-color:rgb(228, 207, 23)
}
.numbers, .actions{
    display: inline-flex;
    flex-wrap: wrap;
}
.clickable{
    display: inline-block;
    background-color:inherit;
    border: 2px solid gray;
    border-radius: 5px;
    cursor: pointer;
    padding:0.1rem 0.5rem 0.1rem 0.5rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    max-width: 40%;
    max-height: 2rem;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
}
.clickable:hover{
    background-color: honeydew;
}
</style>