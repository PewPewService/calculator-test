<template>
  <div class="calculator">
      <div class="result">
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
export default {
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
    methods: {
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
            this.result = this.evaluation + ' = ' + eval(this.evaluation);
            this.evaluation = '';
        },
        lastInput(){
            return this.evaluation.substr(-1);
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
            else if ( ((this.Actions.includes(this.lastInput() ) && button != '0')
              || ( !this.Actions.includes(this.lastInput())))
              && !( ( this.Numbers.includes(this.lastInput()) && button == '(' )
              || ( this.Actions.includes(this.lastInput()) && button == ')' )
              || (this.lastInput() == '(' && this.Actions.includes(button) ) ) ) this.evaluation += button;
            if (this.evaluation == '0' || button.toUpperCase() == 'C') this.evaluation='';
            this.clearInputField();
        }
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

.button{
    width: 2rem;
    height: 2rem;
    margin: 5px 5px;
    font-size: 1rem;
    border: 1px black;
    border-radius: 5px;
    flex: 30%;
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
</style>